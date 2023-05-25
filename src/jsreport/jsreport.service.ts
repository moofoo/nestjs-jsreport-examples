import { Injectable, OnModuleInit } from '@nestjs/common';
import fs from 'fs';
import type JsReport from 'jsreport';
import studentData from './examples/students/data.json';
import ticketData from './examples/flight-ticket/data.json';
import invoiceDocxData from './examples/invoice/data.json';
import invoiceXlsxData from './examples/invoice-xlsx/data.json';
import populationData from './examples/population/data.json';
import htmlToXlsxData from './examples/html-to-xlsx/data.json';
import path from 'path';

/*
  For whatever reason, the return type of jsreport.render(...) doesn't have the 'meta' property,
  hence this custom response type
*/

type JsReportResult = JsReport.Response & {
  meta: {
    reportName: string;
    fileExtension: string;
    contentType: string;
    officeDocumentSType: string;
    logs: any[];
    profileId: string;
  };
};

@Injectable()
export class JsReportService implements OnModuleInit {
  private jsreport: JsReport.Reporter;

  constructor() {
    this.jsreport = require('@jsreport/jsreport-core')({
      sandbox: { allowedModules: '*' },
      rootDirectory: __dirname,
      extensions: {
        assets: {
          allowedFiles: '**/*.*',
          searchOnDiskIfNotFoundInStore: true,
        },
      },
    });
  }

  async onModuleInit() {
    this.jsreport.use(require('@jsreport/jsreport-xlsx')());
    this.jsreport.use(require('@jsreport/jsreport-html-to-xlsx')());
    this.jsreport.use(require(`@jsreport/jsreport-docx`)());
    this.jsreport.use(require(`@jsreport/jsreport-chrome-pdf`)());
    this.jsreport.use(require(`@jsreport/jsreport-handlebars`)());
    this.jsreport.use(require('@jsreport/jsreport-assets')());
    this.jsreport.use(require('@jsreport/jsreport-unoconv')());

    await this.jsreport.init();
  }

  getContentHeaders(result: JsReportResult, pdf = false, defaultType = 'docx') {
    return {
      'Content-Type': pdf
        ? 'application/pdf'
        : `${result.meta.contentType}; charset=utf-8`,
      'Content-Disposition': `attachment; filename="${result.meta.reportName}.${
        pdf ? 'pdf' : defaultType
      }"`,
      'Content-Length': result.content.byteLength,
    };
  }

  async renderInvoice(pdf = false) {
    const result = await this.jsreport.render({
      options: {
        reportName: 'invoice',
      },
      template: {
        content: '',
        recipe: 'docx',
        engine: 'handlebars',
        docx: {
          templateAsset: {
            content: fs.readFileSync(
              path.join(__dirname, 'examples/invoice/template.docx'),
              'base64',
            ),
            encoding: 'base64',
          },
        },
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      },
      data: invoiceDocxData,
    });

    return result as JsReportResult;
  }

  async renderStudent(pdf = false) {
    const result = await this.jsreport.render({
      options: {
        reportName: 'student',
      },
      template: {
        content: '',
        recipe: 'docx',
        engine: 'handlebars',
        docx: {
          templateAsset: {
            content: fs.readFileSync(
              path.join(__dirname, 'examples/students/template.docx'),
              'base64',
            ),
            encoding: 'base64',
          },
        },
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
        helpers: fs.readFileSync(
          path.join(__dirname, 'examples/students/helpers.js'),
          'utf-8',
        ),
      },
      data: studentData,
    });

    return result as JsReportResult;
  }

  async renderTicket() {
    const result = await this.jsreport.render({
      options: {
        reportName: 'ticket',
      },
      template: {
        content: fs.readFileSync(
          path.join(__dirname, 'examples/flight-ticket/template.html'),
          'utf-8',
        ),
        recipe: 'chrome-pdf',
        engine: 'handlebars',
        chrome: {
          printBackground: true,
          marginTop: '30px',
          marginRight: '10px',
          marginLeft: '10px',
          marginBottom: '30px',
          margin: { top: '30px', right: '10px', bottom: '30px', left: '10px' },
        },
        helpers: fs.readFileSync(
          path.join(__dirname, 'examples/flight-ticket/helpers.js'),
          'utf-8',
        ),
      },
      data: ticketData,
    });

    return result as JsReportResult;
  }

  async renderInvoiceSheet(pdf = false) {
    // render options type is missing template.xlsx, for whatever reason

    const result = await this.jsreport.render({
      options: {
        reportName: 'invoice-xlsx',
      },
      template: {
        content: '{{{xlsxPrint}}}',
        recipe: 'xlsx',
        engine: 'handlebars',
        xlsx: {
          templateAsset: {
            content: fs.readFileSync(
              path.join(__dirname, 'examples/invoice-xlsx/template.xlsx'),
              'base64',
            ),
            encoding: 'base64',
          },
        },
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      },
      data: invoiceXlsxData,
    } as any);

    return result as JsReportResult;
  }

  async renderPopulation(pdf = false) {
    const result = await this.jsreport.render({
      options: {
        reportName: 'population',
      },
      template: {
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
              path.join(__dirname, 'examples/population/template.xlsx'),
              'base64',
            ),
            encoding: 'base64',
          },
        },
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
        helpers: fs.readFileSync(
          path.join(__dirname, 'examples/population/helpers.js'),
          'utf-8',
        ),
      },
      data: populationData,
    } as any);

    return result as JsReportResult;
  }

  async renderHtmlToXlsx(pdf = false) {
    const result = await this.jsreport.render({
      options: {
        reportName: 'html-to-xlsx',
      },
      template: {
        recipe: 'html-to-xlsx',
        engine: 'handlebars',
        content: fs.readFileSync(
          path.join(__dirname, 'examples/html-to-xlsx/template.html'),
          'utf-8',
        ),
        unoconv: {
          format: 'pdf',
          enabled: pdf,
        },
      },
      data: htmlToXlsxData,
    } as any);

    return result as JsReportResult;
  }
}
