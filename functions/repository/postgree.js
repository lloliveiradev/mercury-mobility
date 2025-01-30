const { Client, Pool } = require('pg');

class Postegre {
    constructor(credentials) {
        this.credentials = credentials;
        this.client = new Client(this.credentials);
        this.pool = new Pool(this.credentials);
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
    async query(query, values = []) {
        try {
            const results = (await this.pool.query(query, values)).rows;
            return results;
        } catch (error) {
            console.error('@error-query-pg', error.message);
            throw error;
        };
    };
};

module.exports = Postegre;