import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { JsReportModule } from 'nest-js-report';
import { templates } from './templates';

@Module({
  imports: [
    ...templates.map((opts) => JsReportModule.registerTemplate(opts as any)),
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
