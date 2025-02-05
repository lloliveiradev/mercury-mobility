const CustomError = require("../../utils/customError.js");
const JSONObjectMerge = require("json-object-merge");
const Postegre = require("../../repository/postgree.js");
const Firestore = require("../../repository/firestore.js");
const scripts = require("./scripts.js");
const { defaultFields } = require("../../utils/utils.js");
const { validateContract } = require("../../utils/validations.js");

class Displacement {
    constructor(env) {
        this.collection = 'cities_displacement';
        this.pg = new Postegre(env.pg);
        this.fs = new Firestore(env.fs, this.collection);

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

    /**
     * Directs the creation to the chosen database
     * @param {'fs'|'pg'} db 
     */
    async create(db, { data, user }) {
        if (db == 'fs') return await this.add(data, user);
        if (db == 'pg') return await this.insert(data);
    };
    async add(data, user) {
        try {
            this.data = data;
            validateContract(this);
            const obj = this.model(data);
            await this.fs.add(obj, user);
        } catch (error) {
            throw new CustomError({ message: `@displacement-add: ${error.message}`, status: 500 });
        };
    };
    async insert(data) {
        try {
            this.data = data;
            validateContract(this);
            const values = Object.values(this.model(data));
            await this.pg.query(scripts.insert, values);
        } catch (error) {
            throw new CustomError({ message: `@displacement-insert: ${error.message}`, status: 500 });
        };
    };


    /**
     * Directs the read to the chosen database
     * @param {'fs'|'pg'} db 
     */
    async read(db, { rowid, options, scriptName, values }) {
        if (db == 'fs') return await this.get(rowid, options);
        if (db == 'pg') return await this.select(scriptName, values);
        return null;
    };
    async get(rowid = null, options = {}) {
        try {
            if (rowid) {
                const data = await this.fs.get(rowid);
                return data;
            };

            const records = await this.fs.getWhere(options);
            return records;
        } catch (error) {
            if (error.message == "Record not found") return false;
            throw new CustomError({ message: `@displacement-get: ${error.message}`, status: 500 });
        };
    };
    async select(scriptName, values) {
        try {
            const rows = await this.pg.query(scripts[scriptName], values);
            return rows;
        } catch (error) {
            throw new CustomError({ message: `@displacement-select: ${error.message}`, status: 500 });
        };
    };


    /**
     * Directs the modification to the chosen database
     * @param {'fs'|'pg'} db 
     * @param {Object} options
     */
    async alter(db, { data, user }) {
        if (db == 'fs') return await this.set(data, user);
        if (db == 'pg') return await this.update(data);
    };
    async set(data, user, merge = true) {
        try {
            this.data = data;
            validateContract(this);
            const obj = this.model(data);
            await this.fs.set(data.rowid, obj, user, merge);
        } catch (error) {
            throw new CustomError({ message: `@displacement-set: ${error.message}`, status: 500 });
        };
    };
    async update(data) {
        try {
            this.data = data;
            validateContract(this);
            this.rowid = data?.rowid || null;
            const values = Object.values(this.model(data));
            await this.pg.query(scripts.update, values);
        } catch (error) {
            throw new CustomError({ message: `@displacement-update: ${error.message}`, status: 500 });
        };
    };


    /**
     * Directs the erasure to the chosen database
     * @param {'fs'|'pg'} db 
     */
    async erase(db, { rowid, user, real }) {
        if (db == 'fs') return await this.remove(rowid, user, real);
        if (db == 'pg') return await this.delete([rowid]);
    };
    async remove(rowid, user, real = false) {
        try {
            await this.fs.delete(rowid, user, real);
        } catch (error) {
            throw new CustomError({ message: `@displacement-remove: ${error.message}`, status: 500 });
        };
    };
    async delete(values) {
        try {
            await this.pg.query(scripts.delete, values);
        } catch (error) {
            throw new CustomError({ message: `@displacement-delete: ${error.message}`, status: 500 });
        };
    };


    /**
     * Format default object
     * @param {Object} data 
     * @param {Number} data.city_id integer
     * @param {String} data.city varchar(255)
     * @param {String} data.state varchar(2)
     * @param {String} data.country varchar(50)
     * @param {String} data.time_desc varchar(100)
     * @param {Number} data.qtd integer
     * @param {Number} data.avg_time float
     * @param {Number} data.percent_above_1h float
     * @param {Number} data.sensus_year integer
     * 
     * @returns {Object} formatted
     */
    model(data) {
        const obj = {
            ...defaultFields,
            city_id: null,
            city: null,
            state: null,
            country: null,
            time_desc: null,
            qtd: null,
            avg_time: null,
            percent_above_1h: null,
            sensus_year: null,
        };
        const formatted = JSONObjectMerge.default(obj, data);

        if (data.rowid) {
            for (const key in formatted) {
                if (Object.prototype.hasOwnProperty.call(formatted, key)) {
                    const el = formatted[key];
                    if (!el) delete formatted[key];
                };
            };
        };

        return formatted;
    };
};

module.exports = Displacement;