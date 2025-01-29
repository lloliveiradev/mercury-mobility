function routes({ req, res, db, env, controller }) {
    const ctrl = require(`../controllers/${controller}.js`);
    if (req.method == 'POST') {
        if (ctrl.post) ctrl.post({ req, res, db, env });
        else return res.status(400).json({ message: "Method not allowed!" });
    } else if (req.method == 'GET') {
        if (ctrl.get) ctrl.get({ req, res, db, env });
        else return res.status(400).json({ message: "Method not allowed!" });
    } else if (req.method == 'PUT') {
        if (ctrl.put) ctrl.put({ req, res, db, env });
        else return res.status(400).json({ message: "Method not allowed!" });
    } else if (req.method == 'DELETE') {
        if (ctrl.delete) ctrl.delete({ req, res, db, env });
        else return res.status(400).json({ message: "Method not allowed!" });
    };
};

module.exports = routes;