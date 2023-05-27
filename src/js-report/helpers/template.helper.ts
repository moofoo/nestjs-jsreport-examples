import { JsReporter } from '../js-report.provider';

import { Named } from '../types';

export class TemplateHelper {
  private readonly jsReport: JsReporter;

  constructor(jsReport: JsReporter) {
    this.jsReport = jsReport;
  }

  async stored(name: string) {
    const result = await this.jsReport.documentStore
      .collection('templates')
      .find({ name });

    return result.length > 0;
  }

  async insertFn<T = unknown>(
    name: string,
    templateFn: () => (Named & T) | Promise<Named & T>,
  ) {
    const isStored = await this.stored(name);
    if (!isStored) {
      await this.insert(await templateFn());
    }
  }

  async insert<T = unknown>(template: Named & T) {
    const isStored = await this.stored(template.name);
    if (!isStored) {
      await this.jsReport.documentStore
        .collection('templates')
        .insert(template);
    }
  }

  async upsert<T = unknown>(template: Named & T) {
    const isStored = await this.stored(template.name);

    if (!isStored) {
      await this.insert(template);
    } else {
      await this.jsReport.documentStore
        .collection('templates')
        .update({ name: template.name }, { $set: template });
    }
  }

  async remove(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      await this.jsReport.documentStore
        .collection('templates')
        .remove({ name });
    }
  }

  async find<T = unknown>(name: string) {
    const isStored = await this.stored(name);

    if (isStored) {
      const found = await this.jsReport.documentStore
        .collection('templates')
        .find({ name });

      return found[found.length - 1] as Named & T;
    }
  }
}
