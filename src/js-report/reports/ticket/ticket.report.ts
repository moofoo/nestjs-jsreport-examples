import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Chrome } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import ticketData from './template/data.json';

@Injectable()
export class TicketReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.asset.insertAll([
      {
        name: 'style.css',
        path: path.join(__dirname, 'template/style.css'),
        encoding: 'utf-8',
      },
      {
        name: 'route.png',
        path: path.join(__dirname, 'template/images/route.png'),
      },
      {
        name: 'airplane.png',
        path: path.join(__dirname, 'template/images/airplane.png'),
      },
    ]);

    this.jsReport.template.insertFn<Chrome>('ticket', () => ({
      name: 'ticket',
      engine: 'handlebars',
      recipe: 'chrome-pdf',
      chrome: {
        printBackground: true,
        marginTop: '30px',
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: '30px',
        margin: { top: '30px', right: '10px', bottom: '30px', left: '10px' },
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

  async render(data = ticketData) {
    return this.jsReport.render({
      options: { reportName: 'ticket' },
      template: {
        name: 'ticket',
        engine: 'handlebars',
        recipe: 'chrome-pdf',
      },
      data,
    });
  }
}
