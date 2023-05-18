//res.send('Hello World---***');
// res.status(403).json({
//     ok:true,
//     msg:'Get Api'
// });

const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');

const usuariosGet = async (req=request, res = response) => {
    
    const query = {estado:true};
    const { limite=5 , desde=0}= req.query;

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    
    res.json({
        total,
        usuarios
    })
}

const usuariosPost =  async(req, res = response) => {
 
    const { nombre,correo,password,rol } = req.body;
    const usuario=new Usuario( {nombre,correo,password,rol} );

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password =bcryptjs.hashSync(password, salt);

    //Graba en BD
    await usuario.save();

    res.status(201).json({
        msg:`Usuario :${nombre} Creado - Controller`,
        usuario
    });
}

const usuariosPut =  async(req, res = response) => {
    const {id} = req.params;
    const { _id, password,google,correo, ...resto } = req.body;

    if (password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password =bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.status(200).json(usuario);
    // res.status(200).json({
    //     msg:'Put Api - Controller',
    //     usuario
    // });
}

const usuariosPatch =  (req, res = response) => {
    res.status(200).json({
        msg:'Patch Api - Controller'
    });
}

const usuariosDelete =  async (req, res = response) => {
    const {id}= req.params; //Us al que hay que borrar
    const uid = req.uid; //Us que estoy usando para interactuar (Autenticado)
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.status(200).json({
        msg:'El usuario ha sido eliminado',usuario
        });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}