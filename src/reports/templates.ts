export const templates = [
  {
    folder: __dirname,
    name: 'population',
    template: {
      engine: 'handlebars',
      recipe: 'xlsx',
      content: String.raw`
        {{xlsxRemove "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row" 1}}

        {{#each people}}
        {{#xlsxAdd "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row"}}
        <row>
            <c t="inlineStr" s="{{@root.$removedItem.c.[0].$.s}}"><is><t>{{name}}</t></is></c>
            <c t="inlineStr" s="{{@root.$removedItem.c.[1].$.s}}"><is><t>{{gender}}</t></is></c>
            <c s="{{@root.$removedItem.c.[2].$.s}}"><v>{{age}}</v></c>
        </row>
        {{/xlsxAdd}}
        {{/each}}
        
        {{#xlsxMerge "xl/tables/table1.xml" "table"}}
            <autoFilter ref="A1:C{{lastRowIndex people}}"/>
        {{/xlsxMerge}}
        
        {{{xlsxPrint}}}
        `,
      xlsx: {
        templateAsset: {
          content: 'population/template.xlsx',
        },
      },
      helpers: 'population/helpers.js',
    },
  },
  {
    folder: __dirname,
    name: 'invoice',
    template: {
      engine: 'handlebars',
      recipe: 'docx',
      docx: { templateAsset: { content: 'invoice/template.docx' } },
    },
  },
  {
    folder: __dirname,
    name: 'student',
    template: {
      engine: 'handlebars',
      recipe: 'docx',
      docx: { templateAsset: { content: 'student/template.docx' } },
      helpers: 'student/helpers.js',
    },
  },
  {
    folder: __dirname,
    name: 'excel-dashboard',
    scripts: [
      {
        name: 'calculations.js',
        path: 'excel-dashboard/scripts/calculations.js',
      },
    ],
    assets: [
      {
        name: 'excel-dash-style',
        path: 'excel-dashboard/styles/style.css',
        encoding: 'utf-8',
      },
      {
        name: 'project-portfolio-dashboard-template.xlsx',
        path: 'excel-dashboard/project-portfolio-dashboard-template.xlsx',
      },
    ],
    template: {
      engine: 'handlebars',
      recipe: 'html-to-xlsx',
      scripts: [{ name: 'calculations.js' }],
      content: 'excel-dashboard/template.html',
      helpers: 'excel-dashboard/helpers.js',
      htmlToXlsx: {
        htmlEngine: 'chrome',
        templateAssetShortid: 'project-portfolio-dashboard-template.xlsx',
      },
    },
  },
  {
    folder: __dirname,
    name: 'htmlxlsx',
    template: {
      recipe: 'html-to-xlsx',
      engine: 'handlebars',
      htmlToXlsx: { htmlEngine: 'chrome' },
      content: 'html-to-xlsx/template.html',
    },
  },
  {
    folder: __dirname,
    name: 'invoice-xlsx',
    template: {
      recipe: 'xlsx',
      engine: 'handlebars',
      xlsx: { templateAsset: { content: 'invoice-xlsx/template.xlsx' } },
    },
  },
  {
    folder: __dirname,
    initialize: true,
    name: 'pdf-dashboard',
    assets: [
      {
        name: 'pdf-dashboard-style',
        path: 'pdf-dashboard/styles/style.css',
      },
      { name: 'logo.png', path: 'pdf-dashboard/images/logo.png' },
    ],
    template: {
      recipe: 'chrome-pdf',
      engine: 'handlebars',
      chrome: {
        printBackground: true,
        landscape: true,
        format: 'Tabloid',
        marginTop: '0cm',
        marginRight: '0cm',
        marginBottom: '0cm',
        marginLeft: '0cm',
        waitForJS: true,
        width: '',
        height: '',
        margin: {
          top: '0cm',
          right: '0cm',
          bottom: '0cm',
          left: '0cm',
        },
      },
      content: 'pdf-dashboard/template.html',
      helpers: 'pdf-dashboard/helpers.js',
    },
  },
  {
    folder: __dirname,
    name: 'pdf-forms',
    assets: [{ name: 'styles.css', path: 'pdf-forms/styles.css' }],
    template: {
      recipe: 'chrome-pdf',
      engine: 'handlebars',
      chrome: { printBackground: true },
      content: 'pdf-forms/template.html',
    },
  },
  {
    folder: __dirname,
    name: 'ticket',
    assets: [
      { name: 'style.css', path: 'ticket/style.css', encoding: 'utf-8' },
      { name: 'route.png', path: 'ticket/images/route.png' },
      { name: 'airplane.png', path: 'ticket/images/airplane.png' },
    ],
    template: {
      engine: 'handlebars',
      recipe: 'chrome-pdf',
      chrome: {
        printBackground: true,
        marginTop: '30px',
        marginRight: '10px',
        marginLeft: '10px',
        marginBottom: '30px',
        margin: {
          top: '30px',
          right: '10px',
          bottom: '30px',
          left: '10px',
        },
      },
      content: 'ticket/template.html',
      helpers: 'ticket/helpers.js',
    },
  },
];
