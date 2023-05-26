import { Injectable } from '@nestjs/common';
import { JsReportService } from 'src/js-report/js-report.service';
import { Docx } from 'src/js-report/types';
import path from 'path';
import fs from 'fs';
import studentData from './template/data.json';

@Injectable()
export class StudentReport {
  constructor(readonly jsReport: JsReportService) {
    this.jsReport.template.insertFn<Docx>('student', () => ({
      name: 'student',
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
      helpers: fs.readFileSync(
        path.join(__dirname, 'template/helpers.js'),
        'utf-8',
      ),
    }));
  }

  async render(pdf = false, data = studentData) {
    return this.jsReport.render({
      options: { reportName: 'student' },
      template: {
        name: 'student',
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
