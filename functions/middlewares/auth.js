function auth(req, res, env, controller, next) {
    if (req.headers.Authorization != 'Bearer TOKEN') {
        return res.status(403).send({
            "message": "Você não está autorizado a acessar esta função!"
        });
    }
    next(req, res, env, controller);
};

module.exports = auth;