# nestjs-jsreport-examples

```console
git clone https://github.com/moofoo/nestjs-jsreport-examples && cd nestjs-jsreport-examples && yarn && yarn start:dev
```

This repo demonstrates NestJS + JSReport integration. I've replicated all of the JSReport "[showcase](https://jsreport.net/showcases/)" reports minus the "PDF Stock Report", due to it's complexity. Like seriously, they went to town with that one. I also did a few of the simpler example reports from the [JSReport Playground](https://playground.jsreport.net/), just because.

The goal here is not to present a complete, self-contained and ready to use JSReports module, though that will probably happen eventually, with this repo being a big step in that direction. ('this repo' represents ~3 days worth of work integerating a completely unfamiliar code base, so adjust your expectations accordingly).

Rather, I wanted to

- Demonstrate that the JSReport core libraries function adequately outside their usual web-based GUI context, as advertised.

- Towards that end, demonstrate the feasiblity and potential of integrating JsReport with NestJS in code (you're looking at it)

- Hopefully put something together that shows how powerful and fully-featured the core, low-level JSReport framework is on its own, to anyone paying attention. because I think it's cool.

#

#### **RANT**

JSReport, as far as I'm aware, is the only business reports company whose code base, top to bottem, is all open source and free for anyone to use. More impressively, they have intentionally architected their application as a collection of loosely coupled functional parts (extensions) that can be repurposd, mixed and matched, to perform useful work outside of their original Web GUI, Studio context. That is to say, outside the context where they make money for JSReport the business. And to top it all off, the core functionality on offer here, templating and doc gen, is **superlative**. Endless kudos.

Software like this really deserves more attention and love, especially given how crazy expensive and frankly predatory so many SaaS services in the space are.

#### **/RANT**

#

## Implemented Reports and Endpoints

<hr>

#

### [http://localhost:3333/reports/pdf-dashboard](http://localhost:3333/reports/pdf-dashboard)

- ![PDF Dashboard](images/tasks-report.png)

- Chrome PDF
- [Playground Link](https://playground.jsreport.net/w/admin/cBFKE3RY)

#

### [http://localhost:3333/reports/excel-dashboard](http://localhost:3333/reports/excel-dashboard)

- ![Excel Dashboard](images/excel-dashboard.png)

- Chrome PDF
- [Playground Link](https://playground.jsreport.net/w/admin/VvaGnaE)

#

### [http://localhost:3333/reports/student](http://localhost:3333/reports/student)

- ![Students](images/docx-students.png)

- DocX
- [Playground Link](https://playground.jsreport.net/w/admin/d7o0nIWc)

#

### [http://localhost:3333/reports/ticket](http://localhost:3333/reports/ticket)

- ![Ticket](images/e-ticket.png)

- Chrome PDF
- [Playground Link](https://playground.jsreport.net/w/admin/ms2EkdfI)

#

### [http://localhost:3333/reports/pdf-forms](http://localhost:3333/reports/pdf-forms)

- ![Ticket](images/pdf-form.png)
- Chrome PDF
- [Playground Link](https://playground.jsreport.net/w/admin/lbhULCsP)

#

### [http://localhost:3333/reports/invoice](http://localhost:3333/reports/invoice)

- DocX
- [Playground Link](https://playground.jsreport.net/w/admin/yo9J3hvu)

#

### [http://localhost:3333/reports/invoice-xlsx](http://localhost:3333/reports/invoice-xlsx)

- Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/Lh8Kjc~f)

#

### [http://localhost:3333/reports/population](http://localhost:3333/reports/population)

- Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/V71OgRWt)

#

### [http://localhost:3333/reports/html-to-xlsx](http://localhost:3333/reports/html-to-xlsx)

- Html-to-Xlsx
- [Playground Link](https://playground.jsreport.net/w/admin/h45L49Dp)

#

Most of these will generate a PDF (instead .docx or .xlsx) with the query `pdf=1` (i.e, http://localhost:3333/reports/invoice?pdf=1)
