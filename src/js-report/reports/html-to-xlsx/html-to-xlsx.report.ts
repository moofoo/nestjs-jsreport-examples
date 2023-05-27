import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { HtmlXlsx } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import htmlToXlsxData from './template/data.json';

@Injectable()
export class HtmlToXlsxReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.template.insertFn<HtmlXlsx>('htmlxlsx', () => ({
      name: 'htmlxlsx',
      recipe: 'html-to-xlsx',
      engine: 'handlebars',
      htmlToXlsx: {
        htmlEngine: 'chrome',
      },
      content: fs.readFileSync(
        path.join(__dirname, 'template/template.html'),
        'utf-8',
      ),
    }));
  }

  async render(pdf = false, data = htmlToXlsxData) {
    return this.jsReport.render({
      options: { reportName: 'htmlxlsx' },
      template: {
        name: 'htmlxlsx',
        engine: 'handlebars',
        recipe: 'html-to-xlsx',
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      },
      data,
    });
  }
}
