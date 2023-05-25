import { Controller, Res, Get, Query, StreamableFile } from '@nestjs/common';
import { JsReportService } from './jsreport.service';
import { Response } from 'express';

@Controller('reports')
export class JsReportController {
  constructor(private readonly jsreport: JsReportService) {}

  // student docx ///////////////////////////
  @Get('/student')
  async studentReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.jsreport.renderStudent(pdf);

    res.set(this.jsreport.getContentHeaders(result, pdf, 'docx'));

    return new StreamableFile(result.stream as any);
  }

  // invoice docx ///////////////////////////
  @Get('/invoice')
  async invoiceDocxReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.jsreport.renderInvoice(pdf);

    res.set(this.jsreport.getContentHeaders(result, pdf, 'docx'));

    return new StreamableFile(result.stream as any);
  }

  // invoice xlsx ///////////////////////////
  @Get('/invoice-xlsx')
  async invoiceXlsxReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.jsreport.renderInvoiceSheet(pdf);

    res.set(this.jsreport.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  // population xlsx ///////////////////////////
  @Get('/population')
  async populationReport(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.jsreport.renderPopulation(pdf);

    res.set(this.jsreport.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  // basic html-to-xlsx ///////////////////////////
  @Get('/html-to-xlsx')
  async htmlToXlsx(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { pdf?: string },
  ) {
    const pdf = query?.pdf === '1' ? true : false;

    const result = await this.jsreport.renderHtmlToXlsx(pdf);

    res.set(this.jsreport.getContentHeaders(result, pdf, 'xlsx'));

    return new StreamableFile(result.stream as any);
  }

  // ticket chrome-pdf (html to pdf) ///////////////////////////
  @Get('/ticket')
  async ticketReport(@Res({ passthrough: true }) res: Response) {
    const result = await this.jsreport.renderTicket();

    res.set({
      'Content-Type': `application/pdf`,
      'Content-Disposition': 'attachment; filename="flight_ticket.pdf"',
      'Content-Length': result.content.byteLength,
    });

    return new StreamableFile(result.stream as any);
  }
}
