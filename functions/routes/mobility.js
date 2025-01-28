const controller = require('../controllers/mobility.js');

function routes(req, res, db, env) {
    if (req.method == 'POST') {
        controller.post(req, res, db, env);
    } else if (req.method == 'GET') {
        controller.get(req, res, db, env);
    } else if (req.method == 'PUT') {
        controller.put(req, res, db, env);
    } else if (req.method == 'DELETE') {
        controller.delete(req, res, db, env);
    };
};

module.exports = routes;