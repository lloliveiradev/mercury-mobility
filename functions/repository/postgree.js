const { Client } = require('pg');

class Postegre {
    constructor(env) {
        this.client = new Client(env.pg);
    };

    async connect() {
        await this.client.connect();
    };

    async query(query) {
        return await this.client.query(query);
    };
};

module.exports = Postegre;