const Displacement = require('../models/cities_displacement');
const { validateContract } = require('../utils/validations');

class DisplacementCtrl {
    async post({ req, res, env }) {
        try {
            const data = req.body;
            const cls = new Displacement(env);
            validateContract(cls);
            const result = await cls.create(data);
            return res.status(200).json({ id: result });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };

    async get({ req, res, env }) {
        try {
            const query = req.query;
            const cls = new Displacement(env);
            let result;
            if (query.id) result = await cls.read(query);
            else {
                const options = {};
                let { keys, ops, vals } = query;
                if (keys) keys = decodeURIComponent(keys), options.keys = keys;
                if (ops) ops = decodeURIComponent(ops), options.ops = ops;
                if (vals) vals = decodeURIComponent(vals), options.vals = vals;
                result = await cls.readAll(options);
            };
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };

    async put({ req, res, env }) {
        try {
            const data = req.body;
            if (!data.rowid) return res.status(400).json({ message: "Inform a mobility id!" });
            const cls = new Displacement(env);
            validateContract(cls, true);
            data.edited_by = req.user.info.name;
            const result = await cls.update(data);
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };

    async delete({ req, res, env }) {
        try {
            const query = req.query;
            if (!query.rowid) return res.status(400).json({ message: "Inform a mobility id!" });
            const cls = new Displacement(env);
            query.edited_by = req.user.info.name;
            const result = await cls.delete(query);
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };
}

module.exports = new DisplacementCtrl();