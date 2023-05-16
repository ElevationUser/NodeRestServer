const {Schema,model} = require('mongoose');

const UsuarioSchema =Schema({
    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        require:[true,'El correo es obligatorio'],
        unique  :true
    },
    password:{
        type:String,
        require:[true,'La password es obligatoria'],
    },
    imagen:{
        type:String
    },
    rol:{
        type:String,
        require:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        require:true,
        default:true
    },
    google:{
        type:Boolean,
        require:true,
        default:false
    }
});

UsuarioSchema.methods.toJSON = function(){
    //Se remueven los campos que no quiero mostrar en el resultado del insert del usuario
    const {__v ,password , ...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);