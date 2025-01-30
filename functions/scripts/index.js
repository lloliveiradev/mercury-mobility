const Displacement = require("../models/cities_displacement");
const Postegre = require("../repository/postgree");
const credentials = require('../../firebase/credentials.json');
const env = require("../../engine/env.js");
const scripts = require("../models/cities_displacement/scripts.js");

const user = { rowid: '0097', name: 'WebService' };
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require("firebase-admin/app");
env.fs = initializeApp({ credential: cert(credentials) });
env.fs.firestore = () => { return getFirestore(env.fs) };

async function loadDisplacement() {
    try {
        console.info('@loading-displacement');
        // const db = new Postegre(env);
        // await db.query(scripts.create);

        const rows = (require("../../database/cities_displacement.json")).slice(0, 1000);
        const cls = new Displacement(env);
        for (const row of rows) {
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
        };

        //const results = await cls.read('fs', { rowid: null, options: {}, scriptName: 'selectAll', values: null });
    } catch (error) {
        console.error('@error-load-displacement', error);
    };
};

loadDisplacement();