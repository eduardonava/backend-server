// Rrequireds
var express = require('express');
var mongoose = require('mongoose');


// Inicializar variables
var app = express();

app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        message: 'PETICION REALIZADA CORRECTAMENTE'
    })

})


mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log('BASE DE DATOS: \x1b[32m%s\x1b[0m', 'online');

})

//escuchar peticiones
app.listen(3000, () => {
    console.log('Express Server Pueto 3000: \x1b[32m%s\x1b[0m', 'online');
});