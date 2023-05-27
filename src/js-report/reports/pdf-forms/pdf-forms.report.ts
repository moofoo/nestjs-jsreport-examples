import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Chrome } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';

@Injectable()
export class PdfFormsReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.asset.insertAll([
      {
        name: 'styles.css',
        path: path.join(__dirname, 'template/styles.css'),
        encoding: 'utf-8',
      },
    ]);

    this.jsReport.template.insertFn<Chrome>('pdf-forms', () => ({
      name: 'pdf-forms',
      engine: 'handlebars',
      recipe: 'chrome-pdf',
      chrome: {
        printBackground: true,
      },
      content: fs.readFileSync(
        path.join(__dirname, 'template/template.html'),
        'utf-8',
      ),
    }));
  }

  async render() {
    return this.jsReport.render({
      options: { reportName: 'pdf-forms' },
      template: {
        name: 'pdf-forms',
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
    });
  }
}
