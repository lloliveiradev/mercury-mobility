const { Client, Pool } = require('pg');

class Postegre {
    constructor(env) {
        this.credencials = env.pg;
        this.client = new Client(env.pg);
    };

    async newPool(pool) {
        try {
            if (pool) return pool;
            pool = new Pool({
                connectionString: this.credencials.connectionString,
                ssl: this.credencials.ssl,
            });
            return pool;
        } catch (error) {
            console.error('@error-new-pool-pg', error.message);
            throw error;
        };
    };

    async connect() {
        try {
            await this.client.connect();
        } catch (error) {
            console.error('@error-connect-pg', error.message);
            throw error;
        };
    };

    /**
     * execute a query on the database
     * @param {String} query 
     * @param {?Array<String>} values 
     * @returns {Promise<Array<Object>>} results
     */
    async query(query, values) {
        const pool = await this.newPool();
        try {
            const results = (await pool.query(query, values || [])).rows;
            return results;
        } catch (error) {
            console.error('@error-query-pg', error.message);
            throw error;
        };
    };
};

module.exports = Postegre;