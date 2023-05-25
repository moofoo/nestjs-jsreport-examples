import { Module } from '@nestjs/common';
import { JsReportService } from './jsreport.service';
import { JsReportController } from './jsreport.controller';
@Module({
  providers: [JsReportService],
  exports: [JsReportService],
  controllers: [JsReportController],
})
export class JsReportModule {}
