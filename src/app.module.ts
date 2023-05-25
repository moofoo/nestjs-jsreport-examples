import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JsReportModule } from './jsreport/jsreport.module';

@Module({
  imports: [JsReportModule],
  controllers: [AppController],
})
export class AppModule {
  //
}
