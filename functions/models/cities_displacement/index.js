const CustomError = require("../../utils/customError");
const JSONObjectMerge = require("json-object-merge");
const Postegre = require("../../repository/postgree");
const scripts = require("./scripts.js");
const { validateContract } = require("../../utils/validations");

class Displacement {
    constructor(env) {
        this.db = new Postegre(env);
        this.contract = {
            city_id: { required: true, type: 'number' },
            city: { required: true, type: 'string', max: 255 },
            state: { required: true, type: 'string', max: 2 },
            country: { required: true, type: 'string', max: 50 },
            time_desc: { required: true, type: 'string', max: 100 },
            qtd: { required: true, type: 'number' },
            avg_time: { required: false, type: 'number' },
            percent_above_1h: { required: false, type: 'number' },
            sensus_year: { required: true, type: 'number' },
            edited_by: { required: false, type: 'string', max: 100 },
        };
    };

    async insert(data) {
        try {
            validateContract(this);
            const values = Object.values(this.model(data));
            await this.db.query(scripts.insert, values);
        } catch (error) {
            throw new CustomError(`@displacement-insert: ${error.message}`, 500);
        };
    };

    async select(scriptName, values) {
        try {
            return await this.db.query(scripts[scriptName], values);
        } catch (error) {
            throw new CustomError(`@displacement-select: ${error.message}`, 500);
        };
    };

    async update(data) {
        try {
            validateContract(this);
            this.rowid = data?.rowid || null;
            const values = Object.values(this.model(data));
            await this.db.query(scripts.update, values);
        } catch (error) {
            throw new CustomError(`@displacement-update: ${error.message}`, 500);
        };
    };

    async delete() {
        try {
            await this.db.query(scripts.delete, values);
        } catch (error) {
            throw new CustomError(`@displacement-delete: ${error.message}`, 500);
        };
    };

    /**
     * Format default object
     * @param {Object} data 
     * @param {Number} data.rowid integer
     * @param {Number} data.city_id integer
     * @param {String} data.city varchar(255)
     * @param {String} data.state varchar(2)
     * @param {String} data.country varchar(50)
     * @param {String} data.time_desc varchar(100)
     * @param {Number} data.qtd integer
     * @param {Number} data.avg_time float
     * @param {Number} data.percent_above_1h float
     * @param {Number} data.sensus_year integer
     * @param {String} data.edited_by varchar(100)
     * 
     * @returns {Object} formatted
     */
    model(data) {
        const obj = {
            rowid: null,
            city_id: null,
            city: null,
            state: null,
            country: null,
            time_desc: null,
            qtd: null,
            avg_time: null,
            percent_above_1h: null,
            sensus_year: null,
            created_at: null,
            updated_at: null,
            deleted_at: null,
            edited_by: null,
        };
        const formatted = JSONObjectMerge.default(obj, data);
        if (!this.rowid) {
            for (const key in formatted) {
                if (Object.prototype.hasOwnProperty.call(formatted, key)) {
                    const el = formatted[key];
                    if (!el) delete formatted[key]
                };
            };
        };
        return formatted;
    };
};

module.exports = Displacement;