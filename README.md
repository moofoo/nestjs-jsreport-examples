# nestjs-jsreport-examples

```console
git clone https://github.com/moofoo/nestjs-jsreport-examples && cd nestjs-jsreport-examples && yarn && yarn start:dev
```

This repo demonstrates (very basic) NestJS + JSReport integration. The app has six endpoints which generate different reports, taken from the [JSReport Playground](https://playground.jsreport.net/). The goal here is not to present a robust JSReports module, but demonstrate the basics of initializing JsReports and generating reports from templates and data, in addition to covering some of the 'gotchas' and configuration quirks involved.

The following 'Recipes' are used:

- [DocX](https://jsreport.net/learn/docx)
- [Chrome PDF](https://jsreport.net/learn/chrome-pdf) (html-to-pdf using headless chromium)
- [Xlsx](https://jsreport.net/learn/xlsx)
- [Html-to-Xlsx](https://jsreport.net/learn/html-to-xlsx)

## Report Endpoints

### [http://localhost:3333/reports/student](http://localhost:3333/reports/student)

- DocX
- [Playground Link](https://playground.jsreport.net/w/admin/d7o0nIWc)

### [http://localhost:3333/reports/invoice](http://localhost:3333/reports/invoice)

- DocX
- [Playground Link](https://playground.jsreport.net/w/admin/yo9J3hvu)

### [http://localhost:3333/reports/invoice-xlsx](http://localhost:3333/reports/invoice-xlsx)

- Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/Lh8Kjc~f)

### [http://localhost:3333/reports/population](http://localhost:3333/reports/population)

- Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/V71OgRWt)

### [http://localhost:3333/reports/html-to-xlsx](http://localhost:3333/reports/html-to-xlsx)

- Html-to-Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/h45L49Dp)

### [http://localhost:3333/reports/ticket](http://localhost:3333/reports/ticket)

- Chrome PDF
- [Playground Link](https://playground.jsreport.net/w/admin/ms2EkdfI)

All endpoints except for `flight-ticket` endpoint will generate a PDF (instead of .docx or .xlsx) with the query `pdf=1` (i.e, http://localhost:3333/reports/invoice?pdf=1)

## Why do this?

Well, in terms of pure document generation chops (not talking about templating backends, GUIs or workflows), JSReport is more-or-less on par with what is possible using SaaS services like [Bold Reports](https://www.boldreports.com/), [DocxTemplater](https://docxtemplater.com/), [CarboneIO](https://carbone.io), [DocuPilot](https://docupilot.app/), [Formstack](https://www.formstack.com/), etc...

However, unlike those services, JSReports does not gatekeep **ANY** functionality behind payment tiers. Rather, their business model is oriented around usage of their 'Studio' template builder GUI, which has SaaS and self-hosted versions, while the JSReport server code itself is completely open source and accessible.

So, by making use of the [jsreport core package](https://github.com/jsreport/jsreport/tree/master/packages/jsreport-core) you can have self-hosted document generation that's on-par with any SaaS out there.

The [JSReport Studio GUI](https://playground.jsreport.net/w/admin/S3xqZ0Zc) is actually quite good, if that's something you're looking for.
