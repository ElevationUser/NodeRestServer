const Role = require('../models/role');
const Usuario = require('../models/usuario');
const ObjectId = require('mongoose').Types.ObjectId;

//verifica que el rol exista
const esRoleValido = async (rol = '') => {
    const existeRol =await Role.findOne({ rol });
    if ( !existeRol ){
        throw new Error(`El rol ${rol} no es está registrado en la BD`)
    }
}

//verificar si existe el correo
const emailExiste=async (correo='') => {
    const existeMail =await Usuario.findOne({ correo }); 
    if (existeMail) {
        throw new Error(`El Correo ${correo} ya se ecnuentra registrado. Use otro.`);
    }
}

//verificar si existe el id
const existeUsuarioPorId=async (id='') => {
    const existeId =await Usuario.findById({ id }); 
    if (!existeId) {
        throw new Error(`El id ${id} No existe.`);
    }
}

//verifico si es valido el id 
const isValidObjectId= async (id) => {
    if(await ObjectId.isValid(id)){
        const isObject= (String)(new ObjectId(id)) === id;
        if(!isObject){
            throw new Error(`El id** ${id} es invalido.`);
        }
    }else{
        throw new Error(`El id* ${id} es invalido: ${objValid}.`);
    }
    
}

module.exports= {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    isValidObjectId
}