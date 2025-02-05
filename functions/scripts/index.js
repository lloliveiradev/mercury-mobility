const City = require("../models/city/index.js");
const Displacement = require("../models/city_displacement/index.js");
const Postegre = require("../repository/postgree");
const credentials = require('../../firebase/credentials.json');
const env = require("../../engine/env.js");
const scripts = require("../models/city_displacement/scripts.js");

const user = { rowid: '0097', name: 'WebService' };
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require("firebase-admin/app");
env.fs = initializeApp({ credential: cert(credentials) });
env.fs.firestore = () => { return getFirestore(env.fs) };

async function loadDisplacement() {
    try {
        // const db = new Postegre(env);
        // await db.query(scripts.create);

        const rows = (require("../../database/cities_displacement.json")).slice(30000);
        const cls = new Displacement(env);
        let batchNum = 1;
        const max = 10000;
        for (let i = 0; i < max; i += 1000) {
            const batch = rows.slice(i, i + 1000);

            await Promise.all(batch.map(async (row) => {
                try {
                    const data = {
                        city_id: Number(row.code),
                        city: row.city.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                        state: row.state.toUpperCase(),
                        country: 'BRASIL',
                        time_desc: row.time_desc,
                        qtd: parseInt(row.qtd),
                        avg_time: row.avg_time ? parseInt(row.avg_time) : null,
                        percent_above_1h: row.percent_above_1h ? parseInt(row.percent_above_1h) : null,
                        sensus_year: 2010,
                    };
                    await cls.create('fs', { data, user });
                } catch (error) {
                    console.error(error);
                };
            }));
            console.info(`@loading-displacement-batch-${batchNum}`);
            batchNum++;
        };

        //const results = await cls.read('fs', { rowid: null, options: {}, scriptName: 'selectAll', values: null });
    } catch (error) {
        console.error('@error-load-displacement', error);
    };
};

async function loadCities() {
    try {
        const rows = require("../../database/cities_displacement.json");
        const codes = Array.from(new Set(rows.map(e => e.code)));
        const cities = codes.map(code => {
            const row = rows.find(e => e.code === code);
            return {
                code: Number(row.code),
                country: 'BRASIL',
                name: row.city.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                state: row.state.toUpperCase(),
            };
        });
        await Promise.all(cities.map(async (city) => {
            const cls = new City(env);
            await cls.create('fs', { data: city, user });
        }));
    } catch (error) {
        console.error('@error-load-cities', error.message);
    };
};

loadCities();