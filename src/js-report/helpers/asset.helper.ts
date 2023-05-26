import { JsReporter } from '../js-report.provider';
import fs from 'fs';

export class AssetHelper {
  private readonly jsReport: JsReporter;

  constructor(jsReport: JsReporter) {
    this.jsReport = jsReport;
  }

  async stored(name: string) {
    const result = await this.jsReport.documentStore
      .collection('assets')
      .find({ name });

    return result.length > 0;
  }

  async insert(asset: {
    name: string;
    path?: string;
    content?: any;
    encoding?: string;
  }) {
    const isStored = await this.stored(asset.name);

    if (!isStored) {
      if (asset.path && !asset.content) {
        asset.content = fs.readFileSync(asset.path, asset.encoding as any);
      }
    }

    await this.jsReport.documentStore.collection('assets').insert(asset);
  }

  async insertAll(
    assets: Array<{
      name: string;
      path?: string;
      content?: any;
      encoding?: string;
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
  }) {
    const isStored = await this.stored(asset.name);

    if (!isStored) {
      await this.insert(asset);
    } else {
      if (asset.path && !asset.content) {
        asset.content = fs.readFileSync(asset.path, asset.encoding as any);
      }

      await this.jsReport.documentStore
        .collection('assets')
        .update(
          { name: asset.name },
          { $set: { content: asset.content, encoding: asset.encoding } },
        );
    }
  }

  async remove(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      await this.jsReport.documentStore.collection('assets').remove({ name });
    }
  }

  async find(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      const found = await this.jsReport.documentStore
        .collection('assets')
        .find({ name });

      return found[found.length - 1] as {
        name: string;
        path?: string;
        content?: any;
        encoding?: string;
      };
    }
  }
}
