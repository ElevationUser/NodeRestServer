//res.send('Hello World---***');
// res.status(403).json({
//     ok:true,
//     msg:'Get Api'
// });

const {response,request} = require('express');

const usuariosGet = (req=request, res = response) => {
    //const query = req.query; //Query Params  http:\\localhost:8080\api\usuarios?q=928&loc=Bariloche
    const {cant,loc,nombre='No definido'} = req.query; 

    res.json({
       msg:'Get Api - Controller',
       cant,
       loc,
       nombre
    })
}

const usuariosPost =  (req, res = response) => {
    const { nombre, edad} = req.body;
    res.status(201).json({
        msg:'Post Api - Controller',
        nombre,
        edad    
    });
}

const usuariosPut =  (req, res = response) => {
   
    res.status(200).json({
        msg:'Put Api - Controller'
    });
}

const usuariosPatch =  (req, res = response) => {
    res.status(200).json({
        msg:'Patch Api - Controller'
    });
}
const usuariosDelete =  (req, res = response) => {
    res.status(200).json({
        msg:'Delete Api - Controller'
    });
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}