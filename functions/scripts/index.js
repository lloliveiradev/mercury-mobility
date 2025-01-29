const Displacement = require("../models/cities_displacement");
const Postegre = require("../repository/postgree");
const env = require("../env");
const scripts = require("../models/cities_displacement/scripts.js");

async function loadDisplacement() {
    try {
        console.log('@loading-displacement');
        const db = new Postegre(env);
        await db.connect();
        await db.query(scripts.create);

        const rows = (require("../../database/cities_displacement.json")).slice(0, 10);
        const cls = new Displacement(env);
        for (const row of rows) {
            const data = {
                city_id: row.code,
                city: row.city.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                state: row.state.toUpperCase(),
                country: row.country,
                time_desc: row.time_desc,
                qtd: parseInt(row.qtd),
                avg_time: row.avg_time ? parseInt(row.avg_time) : null,
                percent_above_1h: row.percent_above_1h ? parseInt(row.percent_above_1h) : null,
                sensus_year: '2010',
            };
            console.log(row.index, data);
            await cls.insert(data);
        };
    } catch (error) {
        console.error('@error-load-displacement', error);
    };
};

loadDisplacement();