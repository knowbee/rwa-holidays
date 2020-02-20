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

function getLastDayOf(day, month, year) {
  const firstOfDay = getNthDayOf(1, day, month, year).getUTCDate();
  const daysInMonth = new Date(year, month, 0).getUTCDate() - 7;

  let lastOfDay = firstOfDay;
  while (lastOfDay <= daysInMonth) {
    lastOfDay += 7;
  }

  return new Date(Date.parse(`${month}/${lastOfDay}/${year} GMT`));
}

function allFederalHolidaysForYear(
  year = new Date().getFullYear(), {
    shiftSaturdayHolidays = true,
    shiftSundayHolidays = true
  } = {}
) {
  const holidays = [];

  // New Year's Day
  holidays.push({
    name: `New Year's Day`,
    date: new Date(Date.parse(`1/1/${year} GMT`))
  });

  // Birthday of Martin Luther King, Jr.
  // Third Monday of January; fun fact: actual birthday is January 15
  holidays.push({
    name: `Birthday of Martin Luther King, Jr.`,
    date: getNthDayOf(3, 1, 1, year)
  });

  // Washington's Birthday
  // Third Monday of February; fun fact: actual birthday is February 22
  // Fun fact 2: officially "Washington's Birthday," not "President's Day"
  holidays.push({
    name: `Washington's Birthday`,
    date: getNthDayOf(3, 1, 2, year)
  });

  // Memorial Day
  // Last Monday of May
  holidays.push({
    name: `Memorial Day`,
    date: getLastDayOf(1, 5, year)
  });

  // Independence Day
  holidays.push({
    name: `Independence Day`,
    date: new Date(Date.parse(`7/4/${year} GMT`))
  });

  // Labor Day
  // First Monday in September
  holidays.push({
    name: `Labor Day`,
    date: getNthDayOf(1, 1, 9, year)
  });

  // Columbus Day
  // Second Monday in October
  holidays.push({
    name: `Columbus Day`,
    date: getNthDayOf(2, 1, 10, year)
  });

  // Veterans Day
  holidays.push({
    name: `Veterans Day`,
    date: new Date(Date.parse(`11/11/${year} GMT`))
  });

  // Thanksgiving Day
  // Fourth Thursday of November
  holidays.push({
    name: `Thanksgiving Day`,
    date: getNthDayOf(4, 4, 11, year)
  });

  // Christmas Day
  holidays.push({
    name: `Christmas Day`,
    date: new Date(Date.parse(`12/25/${year} GMT`))
  });

  if (shiftSaturdayHolidays || shiftSundayHolidays) {
    holidays.forEach(holiday => {
      // Allow the holiday objects to be modified inside this loop:
      /* eslint-disable no-param-reassign */

      const dow = holiday.date.getUTCDay();

      if (dow === 0 && shiftSundayHolidays) {
        // Actual holiday falls on Sunday. Shift the observed date forward to
        // Monday.
        holiday.date = new Date(
          Date.UTC(
            holiday.date.getUTCFullYear(),
            holiday.date.getUTCMonth(),
            holiday.date.getUTCDate() + 1
          )
        );
      } else if (dow === 6 && shiftSaturdayHolidays) {
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
  }

  holidays.forEach(holiday => {
    holiday.dateString = `${holiday.date.getUTCFullYear()}-${holiday.date.getUTCMonth() +
      1}-${holiday.date.getUTCDate()}`;
  });

  return holidays;
}

function isAHoliday(
  date = new Date(), {
    shiftSaturdayHolidays = true,
    shiftSundayHolidays = true,
    utc = false
  } = {}
) {
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const shift = {
    shiftSaturdayHolidays,
    shiftSundayHolidays
  };

  // Get the holidays this year, plus check if New Year's Day of next year is
  // observed on December 31 and if so, add it to this year's list.
  const allForYear = allFederalHolidaysForYear(year, shift);
  const nextYear = allFederalHolidaysForYear(year + 1, shift);
  if (nextYear[0].date.getUTCFullYear() === year) {
    allForYear.push(nextYear[0]);
  }

  const mm = utc ? date.getUTCMonth() : date.getMonth();
  const dd = utc ? date.getUTCDate() : date.getDate();

  // If any dates in this year's holiday list match the one passed in, then
  // the passed-in date is a holiday.  Otherwise, it is not.
  return allForYear.some(
    holiday =>
    holiday.date.getUTCMonth() === mm && holiday.date.getUTCDate() === dd
  );
}

function getOneYearFromNow() {
  const future = new Date();
  future.setUTCFullYear(new Date().getUTCFullYear() + 1);
  return future;
}

function federalHolidaysInRange(
  startDate = new Date(),
  endDate = getOneYearFromNow(),
  options
) {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const candidates = [];
  for (let year = startYear; year <= endYear; year += 1) {
    candidates.push(...allFederalHolidaysForYear(year, options));
  }
  return candidates.filter(h => h.date >= startDate && h.date <= endDate);
}

module.exports = {
  isAHoliday,
  allForYear: allFederalHolidaysForYear,
  inRange: federalHolidaysInRange
};


// days:
//   01 - 01:
//   _name: 01 - 01
// 01 - 02:
//   _name: Public Holiday
// 02 - 01:
//   name:
//   en: Heroes Day
// easter - 2:
//   _name: easter - 2
// 04 - 07:
//   name:
//   fr: Jour de Mémorial du Génocide
// en: Genocide Memorial Day
// 05 - 01:
//   _name: 05 - 01
// 07 - 01:
//   _name: Independence Day
// 07 - 04:
//   name:
//   fr: Jour de la Libération
// en: Liberation Day
// 08 - 15:
//   _name: 08 - 15
// 1 st friday in August:
//   name:
//   rw: Umuganura
// fr: Journée nationale de récolte
// en: National Harvest Day
// 12 - 25:
//   _name: 12 - 25
// 12 - 26:
//   _name: 12 - 26
// 1 Shawwal:
//   _name: 1 Shawwal
// 10 Dhu al - Hijjah:
//   _name: 10 Dhu al - Hijjah



// 1 st January: New Year’ s Day
// 2n d January: Day after New Year’ s Day
// 1 st February: National Heroes Day
// Good Friday
// Easter Monday
// 7 th April: Genocide against the Tutsi Memorial Day
// 1 st May: Labor Day
// 1 st July: Independence Day
// 4 th July: Liberation Day
// Friday of first week of August: Umuganura Day
// 15 th August: Assumption Day
// 25 th December: Christmas Day
// 26 th December: Boxing Day
// EID EL FITR: the date shall be announced each year by Rwanda Moslems Association;
// EID AL - ADHA: the date shall be announced each year by Rwanda Moslems Association