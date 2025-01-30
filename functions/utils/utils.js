function pathToValue(data, path) {
    if (!(data instanceof Object) || typeof (path) === "undefined") {
        throw `Not valid argument: data: ${data} , path: ${path}`;
    };
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');
    let pathArray = path.split('.');
    for (let i = 0, n = pathArray.length; i < n; ++i) {
        const key = pathArray[i];
        if (key in data) {
            if (data[key] !== null) data = data[key];
            else return null;
        } else return null;
    };
    return data;
};

function localeUs(val) {
    return Number(val || 0).toLocaleString('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};


function age(date) {
    var birthday = + new Date(date);
    return ~~((Date.now() - birthday) / (31557600000));
};

function isValid(data, invalid, valid) {
    if (data == null) return invalid;
    if (data == undefined) return invalid;
    if (typeof data == 'number' && data == 0) return invalid;
    if (typeof data == 'object' && Object.keys(data).length == 0) return invalid;
    if (typeof data == 'string' && data.trim() == '') return invalid;
    if (Array.isArray(data) && data.length == 0) return invalid;
    return valid ? valid : data;
};

function shortenName(text, last) {
    if (!text) return '';

    const parts = text.split(' ');
    let name = parts[0];
    if (last) parts.length > 2 ? name += (' ' + parts[1].substr(0, 1) + '. ' + parts[parts.length - 1]) : parts.length > 1 ? name += ` ${parts[1]}` : name += '';
    else parts.length > 1 ? name += (' ' + parts[1].substr(0, 1) + '.') : name += '';

    return name;
};

function capitalize(text) {
    if (text == null || text == undefined || typeof text != 'string' || text.length == 0) return text;
    let formatted = '';
    text = text.replace(/\s\s+/g, ' ');
    let parts = text.trim().toLowerCase().split(' ');
    parts.forEach(part => {
        formatted += `${typeof part[0] == 'string' ? part[0].toUpperCase() : part[0]}${part.substring(1)} `
    });
    return formatted.trim();
};

async function businessDay(date) {
    if (date) {
        if ([0, 6].includes(dateNow(date).week_day)) return false;
        else return true;
    } else return false;
};

function onlyUnique(val, ix, array) {
    return array.indexOf(val) === ix;
};

function onlyUniqueObj(array, property) {
    const seen = new Set();
    return array.filter(el => {
        const val = el[property];
        if (seen.has(val)) return false;
        else {
            seen.add(val);
            return true;
        };
    });
};

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return true;
    else return false;
};

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};

Date.prototype.addMonths = function (months) {
    let date = new Date(this.valueOf());
    let d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) date.setDate(0);
    return date;
};

/**
 * Valida campos obrigatorios	de um objeto
 * @param {Array<String>} fields 
 * @param {Object} object 
 * @param {?String} prefix nome de uma chave do objecto
 */
function validateRequired(fields, object, prefix = '') {
    fields.forEach(field => {
        const value = object?.[field] || null;
        if (typeof value === 'object' ? !value?.value : !value) {
            throw new CustomErro(`Informe um valor válido para o campo ${prefix}${field}.`, 400);
        };
    });
};

/**
 * Valida campos condicionais	de um objeto
 * @param {Boolean} condition 
 * @param {Array<String>} fields 
 * @param {Object} object 
 * @param {?String} prefix nome de uma chave do objecto
 */
function validateConditional(condition, fields, object, prefix = '') {
    if (condition) validateRequired(fields, object, prefix);
};

function treatValues(val, key, numberExceptions) {
    try {
        if (val.indexOf(',') > 0) return val.split(',');
        if (val.indexOf(';') > 0) return val.split(';');
        if (
            !isNaN(parseInt(val)) &&
            !key.includes('id') &&
            !numberExceptions.includes(key)
        ) return parseInt(val);
        if (val == 'true') return true;
        if (val == 'false') return false;
        if (val == 'null') return null;
        return val;
    } catch (error) {
        console.error(error);
        return val;
    };
};

const defaultFields = {
    "rowid": null,
    "created_at": null,
    "created_by": null,
    "updated_at": null,
    "updated_by": null,
    "deleted": false,
    "deleted_at": null,
    "deleted_by": null,
};

module.exports = {
    pathToValue,
    localeUs,
    age,
    isValid,
    shortenName,
    capitalize,
    businessDay,
    onlyUnique,
    onlyUniqueObj,
    validateEmail,
    validateRequired,
    validateConditional,
    treatValues,
    defaultFields
};