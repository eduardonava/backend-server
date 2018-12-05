var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: '{VALUE} NO ES UN USUARIO VALIDO'
}

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'EL NOMBRE ES REQUIRIDO'] },
    email: { type: String, unique: true, required: [true, 'EL CORREO ES NECESARIO'] },
    password: { type: String, required: [true, 'LA CONTRASEÑA ES NECESARIA'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }

});

usuarioSchema.plugin(uniqueValidator, { message: 'EL CORREO DEBE DE SER UNICO' })

module.exports = mongoose.model('Usuario', usuarioSchema);