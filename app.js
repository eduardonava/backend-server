// Rrequireds
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


// Inicializar variables
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// IMPORTAR RUTAS
var appRoutes = require('./routes/app');
var appUsuarios = require('./routes/usuario');
var appLogin = require('./routes/login');


// rutas
app.use('/usuario', appUsuarios);
app.use('/login', appLogin);
app.use('/', appRoutes);


mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('BASE DE DATOS: \x1b[32m%s\x1b[0m', 'online');

})

//escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server Pueto 3000: \x1b[32m%s\x1b[0m', 'online');
});