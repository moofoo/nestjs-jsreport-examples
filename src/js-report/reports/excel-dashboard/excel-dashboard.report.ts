import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { ScriptsTemplate } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import excelDashData from './template/data.json';

@Injectable()
export class ExcelDashReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.script.insertAll([
      {
        name: 'calculations.js',
        path: path.join(__dirname, 'template/scripts/calculations.js'),
        encoding: 'utf-8',
      },
    ]);

    this.jsReport.asset.insertAll([
      {
        name: 'excel-dash-style',
        path: path.join(__dirname, 'template/styles/style.css'),
        encoding: 'utf-8',
      },
      {
        name: 'project-portfolio-dashboard-template.xlsx',
        path: path.join(
          __dirname,
          'template/project-portfolio-dashboard-template.xlsx',
        ),
      },
    ]);
  }

  async render(pdf = false, data = excelDashData) {
    this.jsReport.template.insert<ScriptsTemplate>({
      name: 'excel-dashboard',
      recipe: 'html-to-xlsx',
      engine: 'handlebars',
      scripts: [{ name: 'calculations.js' }],
      baseXlsxTemplate: null,
      htmlToXlsx: {
        htmlEngine: 'chrome',
        templateAssetShortid: await this.jsReport.asset.shortId(
          'project-portfolio-dashboard-template.xlsx',
        ),
      } as any,
      content: fs.readFileSync(
        path.join(__dirname, 'template/template.html'),
        'utf-8',
      ),
      helpers: fs.readFileSync(
        path.join(__dirname, 'template/helpers.js'),
        'utf-8',
      ),
    } as any);

    return this.jsReport.render({
      options: { reportName: 'excel-dashboard' },
      template: {
        name: 'excel-dashboard',
        engine: 'handlebars',
        recipe: 'html-to-xlsx',
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      } as any,
      data,
    });
  }
}
