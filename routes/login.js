var express = require("express");
var bcrypt = require('bcryptjs');
var Usuario = require("./../models/usuario");
var jwt = require('jsonwebtoken');
var SEND = require('../config/config').SEND;

var app = express();

app.post('/', (req, res) => {
    var body = req.body;
    Usuario.findOne({ email: body.email }, (error, usuarioLogin) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: "CREDENCIALES INVALIDAS",
                errors: { message: "CREDENCIALES INVALIDAS" }
            });
        }

        if (!usuarioLogin) {
            return res.status(400).json({
                ok: false,
                message: "CREDENCIALES INCORRECTAS - EMAIL",
                errors: { message: "CREDENCIALES INCORRECTAS" }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioLogin.password)) {
            return res.status(400).json({
                ok: false,
                message: "CREDENCIALES INCORRECTAS - PASSWORD ",
                errors: { message: "CREDENCIALES INCORRECTAS" }
            });
        }

        usuarioLogin.password = ":)";
        var token = jwt.sign({ usuario: usuarioLogin }, SEND, { expiresIn: 14400 });



        res.status(200).json({
            ok: true,
            message: "LOGUEADO CORRECTAMENTE",
            usuario: usuarioLogin,
            token: token,
            id: usuarioLogin._id
        })

    })
})


module.exports = app;