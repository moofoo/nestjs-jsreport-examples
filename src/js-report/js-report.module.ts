import { Module } from '@nestjs/common';
import { JsReportProvider } from './js-report.provider';
import { JsReportService } from './js-report.service';
import * as Reports from './reports';
import { JsReportController } from './js-report.controller';

@Module({
  providers: [
    JsReportProvider,
    JsReportService,
    Reports.HtmlToXlsxReport,
    Reports.InvoiceReport,
    Reports.InvoiceXlsxReport,
    Reports.PopulationReport,
    Reports.PopulationReport,
    Reports.StudentReport,
    Reports.TicketReport,
  ],
  controllers: [JsReportController],
})
export class JsReportModule {}
