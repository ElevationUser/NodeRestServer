const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    //mismo nombre del campo de la Base de Datos
    rol: {
        type : String,
        required: [true,'El rol es Obligatorio']
    }
});

module.exports = model('Role',RoleSchema);