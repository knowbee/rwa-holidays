const constants = {
  from: 1962,
  to: 2099
};

function getNthDayOf(n, day, month, year) {
  const firstOfMonth = new Date(Date.parse(`${month}/1/${year} GMT`));

  let dayOffset = firstOfMonth.getUTCDay() - day;
  if (dayOffset > 0) {
    dayOffset = 7 - dayOffset;
  } else {
    dayOffset = -dayOffset;
  }
  const initialDay = firstOfMonth.getUTCDate() + dayOffset;

  const finalDay = initialDay + 7 * (n - 1);
  return new Date(Date.parse(`${month}/${finalDay}/${year} GMT`));
}

const getHolidays = (year = new Date().getFullYear()) => {
  const holidays = [];

  if (year < constants.from || year > constants.to) {
    return [];
  }

  if (year > 1994) {
    // 7 th April: Genocide against the Tutsi Memorial Day
    holidays.push({
      name: `Genocide against the Tutsi Memorial Day`,
      date: new Date(Date.parse(`4/7/${year} GMT`))
    });

    // 4 th July: Liberation Day
    holidays.push({
      name: `Liberation Day`,
      date: new Date(Date.parse(`7/4/${year} GMT`))
    });

    // 1 st February: National Heroes Day
    holidays.push({
      name: `National Heroes Day`,
      date: new Date(Date.parse(`2/1/${year} GMT`))
    });
  }
  // New Year's Day
  holidays.push({
    name: `New Year's Day`,
    date: new Date(Date.parse(`1/1/${year} GMT`))
  });

  // 2nd January: Day after New Year’ s Day
  holidays.push({
    name: `Day after New Year’ s Day`,
    date: new Date(Date.parse(`1/2/${year} GMT`))
  });

  // 1 st May: Labor Day
  holidays.push({
    name: `Labor Day`,
    date: new Date(Date.parse(`5/1/${year} GMT`))
  });

  // 1 st July: Independence Day
  holidays.push({
    name: `Independence Day`,
    date: new Date(Date.parse(`7/1/${year} GMT`))
  });

  // 15 th August: Assumption Day
  holidays.push({
    name: `Assumption Day`,
    date: new Date(Date.parse(`8/15/${year} GMT`))
  });

  // 25 th December: Christmas Day
  holidays.push({
    name: `Christmas Day`,
    date: new Date(Date.parse(`12/25/${year} GMT`))
  });
  // 26 th December: Boxing Day
  holidays.push({
    name: `Boxing Day`,
    date: new Date(Date.parse(`12/26/${year} GMT`))
  });

  // Friday of first week of August: Umuganura Day
  holidays.push({
    name: `Umuganura Day`,
    date: getNthDayOf(1, 5, 08, year)
  });

  holidays.forEach(holiday => {
    const day = holiday.date.getUTCDay();

    if (day === 0) {
      // Actual holiday falls on Sunday. Shift the observed date forward to
      // Monday.
      holiday.date = new Date(
        Date.UTC(
          holiday.date.getUTCFullYear(),
          holiday.date.getUTCMonth(),
          holiday.date.getUTCDate() + 1
        )
      );
    } else if (day === 6) {
      // Actual holiday falls on Saturday. Shift the observed date backward
      // to Friday.
      holiday.date = new Date(
        Date.UTC(
          holiday.date.getUTCFullYear(),
          holiday.date.getUTCMonth(),
          holiday.date.getUTCDate() - 1
        )
      );
    }
  });

  holidays.forEach(holiday => {
    holiday.dateString = `${holiday.date.getUTCFullYear()}-${holiday.date.getUTCMonth() +
      1}-${holiday.date.getUTCDate()}`;
  });

  return holidays;
};

const isAHoliday = (date = new Date() || date, { utc = false } = {}) => {
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const allForYear = getHolidays(year);
  const nextYear = getHolidays(year + 1);
  if (nextYear[0].date.getUTCFullYear() === year) {
    allForYear.push(nextYear[0]);
  }

  const mm = utc ? date.getUTCMonth() : date.getMonth();
  const dd = utc ? date.getUTCDate() : date.getDate();

  return allForYear.some(
    holiday =>
      holiday.date.getUTCMonth() === mm && holiday.date.getUTCDate() === dd
  );
};

module.exports = {
  getHolidays,
  isAHoliday
};
