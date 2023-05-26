import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Named } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import populationData from './template/data.json';

@Injectable()
export class PopulationReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.template.insertFn<Named & { xlsx: any }>(
      'population',
      () => ({
        name: 'population',
        recipe: 'xlsx',
        engine: 'handlebars',
        content: String.raw`
        {{xlsxRemove "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row" 1}}

        {{#each people}}
        {{#xlsxAdd "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row"}}
        <row>
            <c t="inlineStr" s="{{@root.$removedItem.c.[0].$.s}}"><is><t>{{name}}</t></is></c>
            <c t="inlineStr" s="{{@root.$removedItem.c.[1].$.s}}"><is><t>{{gender}}</t></is></c>
            <c s="{{@root.$removedItem.c.[2].$.s}}"><v>{{age}}</v></c>
        </row>
        {{/xlsxAdd}}
        {{/each}}
        
        {{#xlsxMerge "xl/tables/table1.xml" "table"}}
            <autoFilter ref="A1:C{{lastRowIndex people}}"/>
        {{/xlsxMerge}}
        
        {{{xlsxPrint}}}
        `,
        xlsx: {
          templateAsset: {
            content: fs.readFileSync(
              path.join(__dirname, 'template/template.xlsx'),
              'base64',
            ),
            encoding: 'base64',
          },
        },
        helpers: fs.readFileSync(
          path.join(__dirname, 'template/helpers.js'),
          'utf-8',
        ),
      }),
    );
  }

  async render(pdf = false, data = populationData) {
    return this.jsReport.render({
      options: { reportName: 'population' },
      template: {
        name: 'population',
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
