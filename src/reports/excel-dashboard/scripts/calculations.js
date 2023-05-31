// we do some calculations here for the report, we use some values to calculate
// some missing values, do some parsing for our report
// and add them to the input data

// this will install the moment module in runtime, you may want to install the library localy from npm and use normal require

const moment = require('moment');

function beforeRender(req, res) {
  req.data = req.data || {};
  req.data.projects = req.data.projects || [];

  req.data.projects = req.data.projects.map((p) => {
    // we use moment.utc here because sample dates was generated with that
    // time offset and we just care about date not time.
    const calendar = moment.utc(p.timeline.calendar);
    const begin = moment.utc(p.timeline.begin);
    const finish = moment.utc(p.timeline.finish);

    return {
      ...p,
      timeline: {
        ...p.timeline,
        calendar: calendar.format('YYYY-MM-DD'),
        begin: begin.format('YYYY-MM-DD'),
        finish: finish.format('YYYY-MM-DD'),
        numberOfDays: finish.diff(begin, 'days'),
      },
      budget: {
        ...p.budget,
        remainder: p.budget.projected - p.budget.actual,
      },
    };
  });
}
