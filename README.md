# rwa-holidays

[![Build Status](https://travis-ci.org/knowbee/rwa-holidays.svg?branch=master)](https://travis-ci.org/knowbee/rwa-holidays)
[![Npm Weekly Downloads](https://badgen.net/npm/dw/rwa-holidays)](https://badgen.net/npm/dw/rwa-holidays)
[![npm](https://img.shields.io/npm/v/rwa-holidays.svg)](https://www.npmjs.com/package/rwa-holidays)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

NPM package for getting Rwanda holidays for a given year or determine if current date is a holiday, it also shifts holidays when actual holiday happens in weekend

### Installation

```
npm install rwa-holidays
```

```
yarn add rwa-holidays
```

### Usage

To get a list of all Rwanda holidays in a given year, use the `getHolidays` method. If no year is passed in, it uses the current year.

```javascript
const { getHolidays } = require('rwa-holidays');

const holidays = getHolidays(2020);


// Results
[
  {
    name: 'Genocide against the Tutsi Memorial Day',
    date: 2020-04-07T00:00:00.000Z,
    dateString: '2020-4-7'
  },
  {
    name: 'Liberation Day',
    date: 2020-07-03T00:00:00.000Z,
    dateString: '2020-7-3'
  },
  {
    name: 'National Heroes Day',
    date: 2020-01-31T00:00:00.000Z,
    dateString: '2020-1-31'
  },
  {
    name: "New Year's Day",
    date: 2020-01-01T00:00:00.000Z,
    dateString: '2020-1-1'
  },
  {
    name: 'Day after New Year’ s Day',
    date: 2020-01-02T00:00:00.000Z,
    dateString: '2020-1-2'
  },
  {
    name: 'Labor Day',
    date: 2020-05-01T00:00:00.000Z,
    dateString: '2020-5-1'
  },
  {
    name: 'Independence Day',
    date: 2020-07-01T00:00:00.000Z,
    dateString: '2020-7-1'
  },
  {
    name: 'Assumption Day',
    date: 2020-08-14T00:00:00.000Z,
    dateString: '2020-8-14'
  },
  {
    name: 'Christmas Day',
    date: 2020-12-25T00:00:00.000Z,
    dateString: '2020-12-25'
  },
  {
    name: 'Boxing Day',
    date: 2020-12-25T00:00:00.000Z,
    dateString: '2020-12-25'
  },
  {
    name: 'Umuganura Day',
    date: 2020-08-07T00:00:00.000Z,
    dateString: '2020-8-7'
  }
]
```

Find if a date is a holiday, use the `isAHoliday` method. If no argument is provided, defaults to the current date:

```javascript
const { isAHoliday } = require("rwa-holidays");

const options = {
  utc: false
};
const isAHoliday = isAHoliday(my_date, options);
// Returns true or false
```

For holidays that fall on Saturdays holidays are shifted to Friday:

```javascript
const { isAHoliday } = require("rwa-holidays");
console.log(isHoliday(new Date("2010-12-25"))); // False
console.log(isHoliday(new Date("2010-12-24"))); // True
```

For holidays that fall on Sundays holidays are shifted to Monday:

```javascript
const { isAHoliday } = require("rwa-holidays");
console.log(isHoliday(new Date("2005-12-25"))); // False
console.log(isHoliday(new Date("2005-12-26"))); // True
```

## Contribution

- Please before making a PR, read first this [Contributing Guideline](./CONTRIBUTING.md)

## License

MIT

## Author

Igwaneza Bruce
