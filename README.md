# nestjs-jsreport-examples

```console
git clone https://github.com/moofoo/nestjs-jsreport-examples && cd nestjs-jsreport-examples && yarn && yarn start:dev
```

This repo demonstrates NestJS + JSReport integration. I've replicated all of the JSReport "[showcase](https://jsreport.net/showcases/)" reports minus the "PDF Stock Report", due to it's complexity. Like seriously, they went to town with that one. I also did a few of the simpler example reports from the [JSReport Playground](https://playground.jsreport.net/), just because.

The goal here is not to present a complete and self-contained JSReports module that others can import and use, though that might happen eventually. Rather, I wanted to

- Show that the integration is possible and its potential,
- Work through the expected 'gotchas', quirks and pain points that come with the territory, so that future templating/report work that I'm actually getting paid for will be hella easy,
- I also want to show off how powerful and fully-featured the core JSReport framework is, to anyone paying attenntion. JSReport is literally the only business reports company that has their entire code base, top to bottom, open source and free for anyone to use, and it's fucking **legit**

Software like this deserves attention and love, especially given how ridiculously costly and frankly predatory so many SaaS services in the space are.

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
