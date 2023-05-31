import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JsReportModule } from 'nest-js-report';
import { ReportsModule } from './reports/reports.module';
@Module({
  imports: [
    JsReportModule.forRoot({
      engines: ['handlebars'],
      recipes: ['docx', 'xlsx', 'html-to-xlsx', 'chrome-pdf'],
      extensions: ['unoconv', 'pdf-utils'],
    }),
    ReportsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  //
}
