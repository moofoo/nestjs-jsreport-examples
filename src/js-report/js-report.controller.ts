import { Controller, Res, Get, Query, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import * as Reports from './reports';
import { JsReportResult } from './types';
import { get } from 'http';

@Controller('reports')
export class JsReportController {
  constructor(
    private student: Reports.StudentReport,
    private population: Reports.PopulationReport,
    private ticket: Reports.TicketReport,
    private html: Reports.HtmlToXlsxReport,
    private invoice: Reports.InvoiceReport,
    private invoiceXlsx: Reports.InvoiceXlsxReport,
    private pdfForms: Reports.PdfFormsReport,
    private pdfDashboard: Reports.PdfDashboardReport,
    private excelDashboard: Reports.ExcelDashReport,
  ) {}

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

  @Get('/excel-dashboard')
  async excelDash(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.excelDashboard.render(pdf);

    res.set(this.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  @Get('/pdf-dashboard')
  async pdfDash(@Res({ passthrough: true }) res: Response) {
    const result = await this.pdfDashboard.render();

    res.set({
      'Content-Type': `application/pdf`,
      'Content-Disposition': 'attachment; filename="pdf-dashboard.pdf"',
      'Content-Length': result.content.byteLength,
    });

    return new StreamableFile(result.stream as any);
  }

  @Get('/pdf-forms')
  async pdfFormal(@Res({ passthrough: true }) res: Response) {
    const result = await this.pdfForms.render();

    res.set(this.getContentHeaders(result, true, 'pdf'));

    return new StreamableFile(result.stream as any);
  }

  // student docx ///////////////////////////
  @Get('/student')
  async studentReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.student.render(pdf);

    res.set(this.getContentHeaders(result, pdf, 'docx'));

    return new StreamableFile(result.stream as any);
  }

  // invoice docx ///////////////////////////
  @Get('/invoice')
  async invoiceDocxReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.invoice.render(pdf);

    res.set(this.getContentHeaders(result, pdf, 'docx'));

    return new StreamableFile(result.stream as any);
  }

  // invoice xlsx ///////////////////////////
  @Get('/invoice-xlsx')
  async invoiceXlsxReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.invoiceXlsx.render(pdf);

    res.set(this.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  // population xlsx ///////////////////////////
  @Get('/population')
  async populationReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.population.render(pdf);

    res.set(this.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  // basic html-to-xlsx ///////////////////////////
  @Get('/html-to-xlsx')
  async htmlToXlsx(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.html.render(pdf);

    res.set(this.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  // ticket chrome-pdf (html to pdf) ///////////////////////////
  @Get('/ticket')
  async ticketReport(@Res({ passthrough: true }) res: Response) {
    const result = await this.ticket.render();

    res.set({
      'Content-Type': `application/pdf`,
      'Content-Disposition': 'attachment; filename="flight_ticket.pdf"',
      'Content-Length': result.content.byteLength,
    });

    return new StreamableFile(result.stream as any);
  }
}
