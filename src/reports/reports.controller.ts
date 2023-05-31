import { Controller, Get, Res } from '@nestjs/common';
import { InjectJsrTemplate, JsReportTemplateService } from 'nest-js-report';

import { Response } from 'express';
import invoiceData from './invoice/data.json';
import studentData from './student/data.json';
import excelDashData from './excel-dashboard/data.json';
import htmlXlsxData from './html-to-xlsx/data.json';
import invoiceXlsxData from './invoice-xlsx/data.json';
import pdfDashData from './pdf-dashboard/data.json';
import ticketData from './ticket/data.json';
import populationData from './population/data.json';

@Controller('/reports')
export class ReportsController {
  constructor(
    @InjectJsrTemplate('invoice') readonly invoice: JsReportTemplateService,
    @InjectJsrTemplate('student') readonly student: JsReportTemplateService,
    @InjectJsrTemplate('excel-dashboard')
    readonly excelDash: JsReportTemplateService,
    @InjectJsrTemplate('htmlxlsx') readonly htmlxlsx: JsReportTemplateService,
    @InjectJsrTemplate('invoice-xlsx')
    readonly invoiceXlsx: JsReportTemplateService,
    @InjectJsrTemplate('pdf-dashboard')
    readonly pdfDashboard: JsReportTemplateService,
    @InjectJsrTemplate('pdf-forms') readonly pdfForms: JsReportTemplateService,
    @InjectJsrTemplate('ticket') readonly ticket: JsReportTemplateService,
    @InjectJsrTemplate('population')
    readonly population: JsReportTemplateService,
  ) {}

  @Get('/population')
  async getPopulation(@Res({ passthrough: true }) res: Response) {
    return this.population.streamFile(res, populationData);
  }

  @Get('/invoice')
  async getInvoice(@Res({ passthrough: true }) res: Response) {
    return this.invoice.streamFile(res, invoiceData);
  }

  @Get('/student')
  async getStudent(@Res({ passthrough: true }) res: Response) {
    return this.student.streamFile(res, studentData);
  }

  @Get('/excel-dashboard')
  async getExcelDashbaord(@Res({ passthrough: true }) res: Response) {
    return this.excelDash.streamFile(res, excelDashData);
  }

  @Get('/htmlxlsx')
  async getHtmlxlsx(@Res({ passthrough: true }) res: Response) {
    return this.htmlxlsx.streamFile(res, htmlXlsxData);
  }

  @Get('/invoice-xlsx')
  async getInvoiceXlsx(@Res({ passthrough: true }) res: Response) {
    return this.invoiceXlsx.streamFile(res, invoiceXlsxData);
  }

  @Get('/pdf-dashboard')
  async getPdfDashboard(@Res({ passthrough: true }) res: Response) {
    return this.pdfDashboard.streamFile(res, pdfDashData);
  }

  @Get('/pdf-forms')
  async getPdfForms(@Res({ passthrough: true }) res: Response) {
    return this.pdfForms.streamFile(res);
  }

  @Get('/ticket')
  async getTicket(@Res({ passthrough: true }) res: Response) {
    return this.ticket.streamFile(res, ticketData);
  }
}
