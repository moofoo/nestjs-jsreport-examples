import { JsReporter } from '../js-report.provider';
import fs from 'fs';

export class AssetHelper {
  private readonly jsReport: JsReporter;
  collectionName = 'assets';

  constructor(jsReport: JsReporter, collectionName = 'assets') {
    this.collectionName = collectionName;
    this.jsReport = jsReport;
  }

  async stored(name: string) {
    const result = await this.jsReport.documentStore
      .collection(this.collectionName)
      .find({ name });

    return result.length > 0;
  }

  async shortId(name) {
    const isStored = await this.stored(name);

    if (!isStored) {
      return 'shortId';
    }

    const found: any = await this.find(name);
    console.log('FOUND', found);

    return found.shortid;
  }

  async insert(asset: {
    name: string;
    path?: string;
    content?: any;
    encoding?: string;
    scope?: string;
  }) {
    const isStored = await this.stored(asset.name);

    if (!isStored) {
      if (asset.path && !asset.content) {
        asset.content = fs.readFileSync(asset.path, asset.encoding as any);
      }
    }

    await this.jsReport.documentStore
      .collection(this.collectionName)
      .insert(asset);
  }

  async insertAll(
    assets: Array<{
      name: string;
      path?: string;
      content?: any;
      encoding?: string;
      scope?: string;
    }>,
  ) {
    for (const asset of assets) {
      await this.insert(asset);
    }
  }

  async upsert(asset: {
    name: string;
    path?: string;
    content?: any;
    encoding?: string;
    scope?: string;
  }) {
    const isStored = await this.stored(asset.name);

    if (!isStored) {
      await this.insert(asset);
    } else {
      if (asset.path && !asset.content) {
        asset.content = fs.readFileSync(asset.path, asset.encoding as any);
      }

      await this.jsReport.documentStore.collection(this.collectionName).update(
        { name: asset.name },
        {
          $set: {
            content: asset.content,
            encoding: asset.encoding,
            scope: asset.scope,
          },
        },
      );
    }
  }

  async remove(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      await this.jsReport.documentStore
        .collection(this.collectionName)
        .remove({ name });
    }
  }

  async find(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      const found = await this.jsReport.documentStore
        .collection(this.collectionName)
        .find({ name });

      return found[found.length - 1] as {
        name: string;
        path?: string;
        content?: any;
        encoding?: string;
        scope?: string;
      };
    }
  }
}
