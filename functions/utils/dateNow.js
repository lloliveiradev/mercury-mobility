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
    const utcDate = toZonedTime(date, 'America/New_York');

    return {
        day: format(utcDate, "dd", { locale: timezone }),
        date: format(utcDate, "yyyy-MM-dd", { locale: timezone }),
        full_string: format(utcDate, "EEEE, MMMM d, yyyy, at h:mm a", { locale: timezone }),
        hours: format(utcDate, "HH:mm a", { locale: timezone }),
        month: format(utcDate, "MM", { locale: timezone }),
        timestamp: new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000),
        week_day: getDay(utcDate),
        week_day_string: format(utcDate, "EE", { locale: timezone }),
        year: format(utcDate, "yyyy", { locale: timezone }),
    };
};

module.exports = dateNow;