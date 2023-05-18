const { response } = require("express");

const esAdminRole = (req, res=response,next  ) =>{
    if( !req.usuarioAutenticado ) {
        return res.status(500).json({
            msg:'Usuario - Token no definido'
        })
    }

    const {rol, nombre} = req.usuarioAutenticado;
    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg:`El usuario ${nombre} debe ser ADMIN para realizar esta operación`
        })
    }

    next();
}

const tieneRole = ( ...roles ) => {
        return (req, res=response ,next ) =>{
            if ( !req.usuarioAutenticado ) {
                return res.status(500).json({
                    msg:'Se requiere verificar el role sin validar el token primero'
                });
            }

            if ( !roles.includes(req.usuarioAutenticado.rol )){
                return res.status(401).json({
                    msg:`El servicio requiere alguno de estos roles: ${roles}`
                });
            }

            next();
        }
    
}

module.exports={
    esAdminRole,
    tieneRole
}