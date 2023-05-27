import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Chrome } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import pdfDashData from './template/data.json';

@Injectable()
export class PdfDashboardReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.asset.insertAll([
      {
        name: 'pdf-daashboard-style',
        path: path.join(__dirname, 'template/styles/style.css'),
        encoding: 'utf-8',
      },
      {
        name: 'logo.png',
        path: path.join(__dirname, 'template/images/logo.png'),
      },
    ]);

    this.jsReport.template.insertFn<Chrome>('pdf-dashboard', () => ({
      name: 'pdf-dashboard',
      engine: 'handlebars',
      recipe: 'chrome-pdf',
      chrome: {
        printBackground: true,
        landscape: true,
        format: 'Tabloid',
        marginTop: '0cm',
        marginRight: '0cm',
        marginBottom: '0cm',
        marginLeft: '0cm',
        waitForJS: true,
        width: '',
        height: '',
        timeout: 59931,
        margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' },
      },
      content: fs.readFileSync(
        path.join(__dirname, 'template/template.html'),
        'utf-8',
      ),
      helpers: fs.readFileSync(
        path.join(__dirname, 'template/helpers.js'),
        'utf-8',
      ),
    }));
  }

  async render(data = pdfDashData) {
    return this.jsReport.render({
      options: { reportName: 'pdf-dashboard' },
      template: {
        name: 'pdf-dashboard',
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
      data,
    });
  }
}
