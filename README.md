# nestjs-jsreport-examples

```console
git clone https://github.com/moofoo/nestjs-jsreport-examples && cd nestjs-jsreport-examples && yarn && yarn start:dev
```

This repo demonstrates (very basic) NestJS + JSReport integration. The app has six endpoints which generate different reports, taken from the [JSReport Playground](https://playground.jsreport.net/).

The following 'Recipes' are used:

- [DocX](https://jsreport.net/learn/docx)
- [Chrome PDF](https://jsreport.net/learn/chrome-pdf) (html-to-pdf using headless chromium)
- [Xlsx](https://jsreport.net/learn/xlsx)
- [Html-to-Xlsx](https://jsreport.net/learn/html-to-xlsx)

## Report Endpoints

### [http://localhost/reports/students](http://localhost/reports/students)

- DocX
- [Playground Link](https://playground.jsreport.net/w/admin/d7o0nIWc)

### [http://localhost/reports/invoice](http://localhost/reports/invoice)

- DocX
- [Playground Link](https://playground.jsreport.net/w/admin/yo9J3hvu)

### [http://localhost/reports/invoice-xlsx](http://localhost/reports/invoice-xlsx)

- Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/Lh8Kjc~f)

### [http://localhost/reports/population](http://localhost/reports/population)

- Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/V71OgRWt)

### [http://localhost/reports/html-to-xlsx](http://localhost/reports/html-to-xlsx)

- Html-to-Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/h45L49Dp)

### [http://localhost/reports/flight-ticket](http://localhost/reportsflight-ticket)

- Chrome PDF
- [Playground Link](https://playground.jsreport.net/w/admin/ms2EkdfI)

#

All endpoints except for `flight-ticket` endpoint will generate a PDF (instead of .docx or .xlsx) with the query `pdf=1` (i.e, http://localhost/reports/invoice?pdf=1)

## Why do this?

Well, in terms of pure document generation chops (not talking about templating backends, GUIs or workflows), JSReport is more-or-less on par with what is possible using SaaS services like [Bold Reports](https://www.boldreports.com/), [DocxTemplater](https://docxtemplater.com/), [CarboneIO](https://carbone.io), [DocuPilot](https://docupilot.app/), [Formstack](https://www.formstack.com/), etc...

However, unlike those services, JSReports does not gatekeep **ANY** functionality behind payment tiers. Rather, their business model is oriented around usage of their 'Studio' template builder GUI, which has SaaS and self-hosted versions, while the JSReport server code itself is completely open source and accessible.

So, by making use of the [jsreport core package](https://github.com/jsreport/jsreport/tree/master/packages/jsreport-core), and with shockingly little effort, you can have self-hosted document generation that's on-par with any SaaS out there. **For $0.00.**

The [JSReport Studio GUI](https://playground.jsreport.net/w/admin/S3xqZ0Zc) is actually quite good, if that's something you're looking for. Very 'developer oriented' and flexible, unlike other templating backends I've tried (which are usually intended for document creators, not devs).

## Notes

- Passing a string of javascript to create custom template handlers seems...kinda weird? Am I missing something? I suppose it makes more sense in the context of the Studio GUI.

- Note how the jsreport instance config affects the asset placeholder paths in [template.html](src/jsreport/examples/flight-ticket/template.html). Specifically the `rootDirectory` option:

```typescript
this.jsreport = require('@jsreport/jsreport-core')({
  sandbox: { allowedModules: '*' },
  rootDirectory: __dirname,
  extensions: {
    assets: {
      allowedFiles: '**/*.*',
      searchOnDiskIfNotFoundInStore: true,
    },
  },
});
```
