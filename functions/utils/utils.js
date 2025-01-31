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

function numberUs(val) {
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
    let name = text;
    parts.forEach((part, ix) => {
        if (ix == 0) name = part;
        else if (ix == parts.length - 1 && last && parts.length > 2) name += ` ${part}`;
        else if (part.length > 2) name += ` ${part.substr(0, 1)}.`;
    });

    return name;
};

function capitalize(text) {
    if (text == null || text == undefined || typeof text != 'string' || text.length == 0) return text;
    let formatted = '';
    text = text.replace(/\s\s+/g, ' ');
    let parts = text.trim().toLowerCase().split(' ');
    parts.forEach(part => {
        formatted += `${typeof part[0] == 'string' ? part[0].toUpperCase() : part[0]}${part.substring(1)} `;
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
        const lastKey = key.indexOf('.') > -1 ? key.split('.')[key.split('.').length - 1] : key;
        if (val.indexOf(',') > 0) val = val.split(',');
        if (val.indexOf(';') > 0) val = val.split(';');
        if (Array.isArray(val)) {
            if (!numberExceptions.includes(lastKey)) val.map(e => Number(e));
            return val;
        };
        if (
            !isNaN(parseInt(val)) &&
            !lastKey.includes('id') &&
            !numberExceptions.includes(lastKey)
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

function buildParamsFs(key, operation, value) {
    const params = [];
    if (key && key.includes("*")) {
        if (key && operation && value) {
            key = decodeURIComponent(key);
            operation = decodeURIComponent(operation);
            value = decodeURIComponent(value);

            const keys = key.indexOf('*') > -1 ? key.split("*") : key;
            const ops = operation.indexOf('*') > -1 ? operation.split("*") : operation;
            const vals = value.indexOf('*') > -1 ? value.split("*") : value;

            keys.forEach((el, ix) => {
                params.push({
                    key: el,
                    operation: ops[ix] === "array" ? "array-contains" : ops[ix],
                    value: treatValues(vals[ix], el, ['value', 'id_chamado']),
                });
            });
        };
    } else if (key && value) {
        params.push({
            key,
            operation: operation ? operation == "array" ? "array-contains" : operation : '==',
            value,
        });
    };
    params.push({ key: "deleted", operation: "==", value: false });
    return params;
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
    localeUs: numberUs,
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
    defaultFields,
    buildParamsFs
};