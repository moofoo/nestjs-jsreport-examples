/* eslint-disable @typescript-eslint/no-unused-vars */
const _ = require('lodash');
const moment = require('moment');

function uppercase(str) {
  return str.toUpperCase();
}

function getAge(dof) {
  return moment().year() - moment(dof).year();
}

function sortSchools(schools) {
  const list = [...schools];

  return _.orderBy(
    list,
    (item) => {
      return parseInt(item.yearEnd, 10);
    },
    'desc',
  );
}

function sortContacts(contacts) {
  const list = [...contacts];

  return _.orderBy(
    list,
    (item) => {
      return item.priority;
    },
    'asc',
  );
}

function sortScores(scores) {
  const list = [...scores];

  return _.orderBy(
    list,
    (item) => {
      return parseInt(item.period, 10);
    },
    'desc',
  );
}

function getAttendanceChartData(attendance) {
  const labels = ['Present', 'Absence'];

  const total = attendance.reduce(
    (acu, record) => {
      if (record.state === 'P') {
        acu.present += 1;
      } else if (record.state === 'A') {
        acu.absence += 1;
      }

      return acu;
    },
    { present: 0, absence: 0 },
  );

  const datasets = [
    {
      label: 'Attendance',
      data: [total.present, total.absence],
    },
  ];

  return {
    labels,
    datasets,
  };
}

function getCoursesRatingChartData(lastRating) {
  const lastRatingSorted = _.orderBy(
    lastRating,
    (item) => {
      return parseInt(item.period, 10);
    },
    'desc',
  );

  const labels = lastRatingSorted.map((el) => `Period ${el.period}`);

  const datasets = [
    {
      label: 'High Courses',
      data: lastRatingSorted.map((item) => item.highCourses),
    },
    {
      label: 'Medium Courses',
      data: lastRatingSorted.map((item) => item.mediumCourses),
    },
    {
      label: 'Low Courses',
      data: lastRatingSorted.map((item) => item.lowCourses),
    },
  ];

  return {
    labels,
    datasets,
  };
}

function getScoreColor(score) {
  if (score >= 17) {
    return '067F1A';
  } else if (score <= 13) {
    return 'FF0000';
  }

  return '000000';
}
