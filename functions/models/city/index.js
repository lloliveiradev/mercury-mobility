const CustomError = require("../../utils/customError.js");
const JSONObjectMerge = require("json-object-merge");
const Postegre = require("../../repository/postgree.js");
const Firestore = require("../../repository/firestore.js");
const scripts = require("./scripts.js");
const { defaultFields } = require("../../utils/utils.js");
const { validateContract } = require("../../utils/validations.js");

class City {
    constructor(env) {
        this.collection = 'cities';
        this.pg = new Postegre(env.pg);
        this.fs = new Firestore(env.fs, this.collection);

        this.contract = {
            code: { required: true, type: 'number' },
            country: { required: true, type: 'string', max: 50 },
            name: { required: true, type: 'string', max: 255 },
            state: { required: true, type: 'string', max: 2 },
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
            throw new CustomError({ message: `@city-add: ${error.message}`, status: 500 });
        };
    };
    async insert(data) {
        try {
            this.data = data;
            validateContract(this);
            const values = Object.values(this.model(data));
            await this.pg.query(scripts.insert, values);
        } catch (error) {
            throw new CustomError({ message: `@city-insert: ${error.message}`, status: 500 });
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
            throw new CustomError({ message: `@city-get: ${error.message}`, status: 500 });
        };
    };
    async select(scriptName, values) {
        try {
            const rows = await this.pg.query(scripts[scriptName], values);
            return rows;
        } catch (error) {
            throw new CustomError({ message: `@city-select: ${error.message}`, status: 500 });
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
            throw new CustomError({ message: `@city-set: ${error.message}`, status: 500 });
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
            throw new CustomError({ message: `@city-update: ${error.message}`, status: 500 });
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
            throw new CustomError({ message: `@city-remove: ${error.message}`, status: 500 });
        };
    };
    async delete(values) {
        try {
            await this.pg.query(scripts.delete, values);
        } catch (error) {
            throw new CustomError({ message: `@city-delete: ${error.message}`, status: 500 });
        };
    };


    /**
     * Format default object
     * @param {Object} data 
     * @param {Number} data.code integer
     * @param {String} data.country varchar(50)
     * @param {String} data.name varchar(255)
     * @param {String} data.state varchar(2)
     * 
     * @returns {Object} formatted
     */
    model(data) {
        const obj = {
            ...defaultFields,
            code: null,
            country: null,
            name: null,
            state: null,
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

module.exports = City;