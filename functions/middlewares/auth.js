function auth(req, res, db, env, next) {
    if (req.headers.auth != 'TOKEN') {
        return res.status(403).send({
            "message": "Você não está autorizado a executar esta ação!"
        });
    }
    next(req, res, db, env);
};

module.exports = auth;