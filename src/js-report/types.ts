import { Response, TemplateRegistry } from 'jsreport-core';

export type Named = TemplateRegistry['NamedTemplate'];
export type Docx = TemplateRegistry['DocxTemplateModifier'] & Named;
export type Chrome = TemplateRegistry['ChromeTemplate'] & Named;
export type Xlsx = TemplateRegistry['XlsxTemplate'] & Named;
export type HtmlXlsx = TemplateRegistry['Html2XlsxTemplate'] & Named;

export type ScriptsTemplate = TemplateRegistry['ScriptsTemplate'] & HtmlXlsx;

export type JsReportResult = Response & {
  meta: {
    reportName: string;
    fileExtension: string;
    contentType: string;
    officeDocumentSType: string;
    logs: any[];
    profileId: string;
  };
};
