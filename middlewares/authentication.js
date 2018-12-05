var SEND = require('../config/config').SEND;
var jwt = require('jsonwebtoken');

/**
 *  VERIFICAR TOKEN
 */

exports.verificarToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEND, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'TOKEN INCORRECTO',
                errors: err
            });
        }

        req.usuario = decoded.usuario;
        next();

        // res.status(200).json({
        //     ok: true,
        //     decoded: decoded
        // });

    });
}