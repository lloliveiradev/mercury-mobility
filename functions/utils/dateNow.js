const { toZonedTime, format } = require('date-fns-tz');
const timezone = require('date-fns/locale');
const { getDay } = require('date-fns');
/**
 * @typedef dateNow
 * @property {Date} date_timestamp
 * @property {String} day
 * @property {String} date
 * @property {String} full_string
 * @property {String} hours
 * @property {String} month
 * @property {String} timestamp
 * @property {String} week_day
 * @property {String} week_day_string
 * @property {String} year
*/
/**
 *
 * @param {String | Date} date
 * @returns {Object} dateNow
*/
function dateNow(date) {
    date = date ? new Date(date) : new Date();
    console.log('@date', date);
    const utcDate = toZonedTime(date, 'America/New_York');

    return {
        day: format(date, "dd", { locale: timezone.enUS }),
        date: format(date, "yyyy-MM-dd", { locale: timezone.enUS }),
        full_string: format(date, "EEEE, MMMM d, yyyy, 'at' h:mm a", { locale: timezone.enUS }),
        hours: format(date, "hh:mm a", { locale: timezone.enUS }),
        month: format(date, "MM", { locale: timezone.enUS }),
        timestamp: new Date(date.getTime() - date.getTimezoneOffset() * 60000),
        week_day: getDay(date),
        week_day_string: format(date, "EEEE", { locale: timezone.enUS }),
        year: format(date, "yyyy", { locale: timezone.enUS }),
    };
};

module.exports = dateNow;