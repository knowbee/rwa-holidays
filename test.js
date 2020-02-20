const fedHolidays = require('./index.js');

const options = {
  shiftSaturdayHolidays: true,
  shiftSundayHolidays: true
};
const holidays = fedHolidays.allForYear(2020, options);

console.log(holidays)