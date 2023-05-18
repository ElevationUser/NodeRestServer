const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');


const login = async (req,res=response)=>{
    const {correo,password} = req.body;

    //Valido si el correo existe
    const usuario = await Usuario.findOne({correo});
    if (!usuario) {
        return res.status(400).json({
            msg:'Usuario / password no son correctos - correo'
        })
    }
    //valido si esta activo
    if (usuario.estado===false) {
        return res.status(400).json({
            msg:'Usuario no activo - Correo'
        })
    }

    //Valido la contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password);
    if (!validPassword){
        return res.status(400).json({
            msg:'Password incorrecta - ******'
        })
    }

    //JSON Web  Token
    const token = await generarJWT(usuario.id);

    try {
        res.status(200).json({
            msg:'login ok - Controller',
            token: token,
            usuario
        })
    } catch (error) {
        console.log('Error :',error);
        res.status(500).json({
            msg:"Error en la autenticación"
        })
    }
}

module.exports = {
    login
}
