import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Named } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import invoiceData from './template/data.json';

@Injectable()
export class InvoiceXlsxReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.template.insertFn<Named & { xlsx: any }>(
      'invoice-xlsx',
      () => ({
        name: 'invoice-xlsx',
        content: '{{{xlsxPrint}}}',
        recipe: 'xlsx',
        engine: 'handlebars',
        xlsx: {
          templateAsset: {
            content: fs.readFileSync(
              path.join(__dirname, 'template/template.xlsx'),
              'base64',
            ),
            encoding: 'base64',
          },
        },
      }),
    );
  }

  async render(pdf = false, data = invoiceData) {
    return this.jsReport.render({
      options: { reportName: 'invoice-xlsx' },
      template: {
        name: 'invoice-xlsx',
        engine: 'handlebars',
        recipe: 'xlsx',
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      },
      data,
    });
  }
}
