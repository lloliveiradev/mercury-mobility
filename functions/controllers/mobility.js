const Mobility = require('../models/mobility');
const CustomError = require("../utils/customError");
const { validateContract } = require('../utils/validations');

class MobilityCtrl {
    async post(req, res, db) {
        try {
            const data = req.body;
            const mobility = new Mobility(data, db, req.user.info);
            validateContract(mobility);
            const result = await mobility.create();
            return res.status(200).json({ id: result });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };

    async get(req, res, db) {
        try {
            const query = req.query;
            const cls = new Mobility(query, db, req.user.info);
            let result;
            if (query.id) result = await cls.read();
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

    async put(req, res, db) {
        try {
            const data = req.body;
            if (!data.id) return res.status(400).json({ message: "Inform a mobility id!" });
            const mobility = new Mobility(data, db, req.user.info);
            validateContract(mobility, true);
            const result = await mobility.update();
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };

    async delete(req, res, db) {
        try {
            const query = req.query;
            if (!query.id) return res.status(400).json({ message: "Inform a mobility id!" });
            const mobility = new Mobility(query, db, req.user.info);
            const result = await mobility.delete(query.id);
            return res.status(200).json({ message: result });
        } catch (error) {
            return res.status(error?.status || 500).json({ message: error.message });
        };
    };
}

module.exports = new MobilityCtrl();