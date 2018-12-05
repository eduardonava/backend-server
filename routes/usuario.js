var express = require('express');
var Usuario = require('./../models/usuario');
var bcrypt = require('bcryptjs');
var SEND = require('../config/config').SEND;
var jwt = require('jsonwebtoken');
var mdAuthentication = require('../middlewares/authentication');
// inicializzamos node
var app = express();



/**
 *  OBTENER TODOS LOS USUARIOS
 */

app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    res.status(500).json({
                        ok: false,
                        message: 'ERROR CARGANDO USUARIOS',
                        errors: err
                    })
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                })

            });

});




/**
 *    ACTUALIZAR USUARIO
 */

app.put('/:id', mdAuthentication.verificarToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'NO SE ENCONTRO USUARIO',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'EL USUARIO CON EL ID ' + id + ' NO EXISTE',
                errors: { message: "NO EXISTE UN USUARIO CON ESE ID" }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioSave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'ERROR AL ACTUALIZAR USUARIO',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuarios: usuario
            });

        });
    });
})


/**
 *  CREAR UN USUARIO 
 */

app.post('/', mdAuthentication.verificarToken, (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        img: body.img,
        role: body.role
    });

    usuario.save((err, correcto) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'ERROR AL CREAR USUARIO',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            message: 'USUARIO CREADO CORRECTAMENTE',
            usuarioToken: req.usuario,
            usuarios: correcto
        });

    });

});

/**
 *   ELIMINAR USUARIO
 */

app.delete('/:id', mdAuthentication.verificarToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndDelete(id, (error, usuarioBorrado) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: 'OCURRIO UN ERROR AL ELIMINAR UN USUARIO',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                message: 'NO EXISTE EL USUARIO',
                errors: { message: "No existe el usuario" }
            });
        }

        res.status(200).json({
            ok: true,
            message: 'USUARIO ELIMINADO CORRECTAMENTE',
            usuarios: usuarioBorrado
        });

    })
})


module.exports = app;