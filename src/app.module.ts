import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JsReportModule } from './js-report/js-report.module';
@Module({
  imports: [JsReportModule],
  controllers: [AppController],
})
export class AppModule {
  //
}
