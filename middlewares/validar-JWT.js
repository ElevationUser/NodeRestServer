const jwt=require('jsonwebtoken');
const colors = require('colors/safe');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request, res=response , next) =>{
    const token=req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'No hay Token en la peticion'
        });
    }
    try {
        //Verifico el Token 
        const { uid } = jwt.verify(token,process.env.SECRETKEY);
        const usuario=await Usuario.findById( uid );
        
        //Si el usuario no existe
        if (!usuario){
            return res.status(401).json({
                msg:'Usuario del Token no existe'
            })
        }

        //Verifico que el usuario del token este activo
        if ( !usuario.estado ){
            return res.status(401).json({
                msg:'Token invalido - Usuario no existe o dado de baja'
            })
        }

        req.usuarioAutenticado=usuario;
        next();

    } catch (error) {
        console.log(colors.red('Error en la validacion del Token'));
        return res.status(401).json({
            msg:'Token no valido'
        });
    }
}

module.exports={
    validarJWT
}