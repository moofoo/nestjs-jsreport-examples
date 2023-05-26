import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Docx } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import invoiceData from './template/data.json';

@Injectable()
export class InvoiceReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.template.insertFn<Docx>('invoice', () => ({
      name: 'invoice',
      content: '',
      recipe: 'docx',
      engine: 'handlebars',
      docx: {
        templateAsset: {
          content: fs.readFileSync(
            path.join(__dirname, 'template/template.docx'),
            'base64',
          ),
          encoding: 'base64',
        },
      },
    }));
  }

  async render(pdf = false, data = invoiceData) {
    return this.jsReport.render({
      options: { reportName: 'invoice' },
      template: {
        name: 'invoice',
        engine: 'handlebars',
        recipe: 'docx',
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      },
      data,
    });
  }
}
