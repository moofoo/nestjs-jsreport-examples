import { JS_REPORT_TOKEN, JsReporter } from './js-report.provider';
import { Injectable, Inject } from '@nestjs/common';
import { AssetHelper } from './helpers/asset.helper';
import { TemplateHelper } from './helpers/template.helper';
import { JsReportResult } from './types';
import { Request } from 'jsreport-core';

@Injectable()
export class JsReportService {
  constructor(@Inject(JS_REPORT_TOKEN) private jsReport: JsReporter) {
    this.asset = new AssetHelper(jsReport);
    this.template = new TemplateHelper(jsReport);
  }

  asset: AssetHelper;
  template: TemplateHelper;

  render(request: Request, parent?: Request) {
    return this.jsReport.render(request, parent) as Promise<JsReportResult>;
  }

  get documentStore() {
    return this.jsReport.documentStore;
  }

  get settings() {
    return this.jsReport.settings;
  }
}
