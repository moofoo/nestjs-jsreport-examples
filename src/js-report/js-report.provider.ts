import type JsReport from 'jsreport-core';
import JsReportCore from '@jsreport/jsreport-core';

const useFactory = async () => {
  /*
    A lot of these config options don't apply to this situation (not running the Studio or dealing with multiple users, needing to sandbox potentially dangerous code, etc).
  */
  const jsReport = JsReportCore({
    loadConfig: false,
    autoTempCleanup: true,
    discover: false,
    trustUserCode: true,
    templatingEngines: { allowedModules: '*', strategy: 'in-process' },
    extensions: {
      'chrome-pdf': {
        timeout: 30000,
        launchOptions: {
          headless: 'new',
        },
      },
      express: {
        enabled: false,
      },
      authentication: {
        enabled: false,
      },
      studio: {
        enabled: false,
      },
      scheduling: {
        enabled: false,
      },
      assets: {
        allowedFiles: '**/*.*',
      },
    },
  } as JsReport.Configuration) as JsReport.Reporter;

  jsReport.use(require('@jsreport/jsreport-xlsx')());
  jsReport.use(require('@jsreport/jsreport-html-to-xlsx')());
  jsReport.use(require(`@jsreport/jsreport-docx`)());
  jsReport.use(require(`@jsreport/jsreport-chrome-pdf`)());
  jsReport.use(require(`@jsreport/jsreport-handlebars`)());
  jsReport.use(require('@jsreport/jsreport-assets')());
  jsReport.use(require('@jsreport/jsreport-unoconv')());

  await jsReport.init();

  return jsReport;
};

export type JsReporter = Awaited<ReturnType<typeof useFactory>>;

export const JS_REPORT_TOKEN = Symbol('JS_REPORT_TOKEN');

export const JsReportProvider = {
  provide: JS_REPORT_TOKEN,
  useFactory,
};
