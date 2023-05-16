const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos }=require('../middlewares/validar-campos');
const { esRoleValido,emailExiste,existeUsuarioPorId,isValidObjectId } = require('../helpers/db-validators');
const { 
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete 
} = require('../controllers/usuarios.controller');

const router = Router();
router.get('/', usuariosGet );
//check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),

router.post('/',[
    check('nombre','El Nombre es obligatorio').not().isEmpty(),
    check('correo','El Correo es obligatorio').isEmail(),
    check('correo').custom( emailExiste ),
    check('password','El Password debe contener entre 6 y 20 caracteres').isLength({min:6,max:20}),
    check('rol').custom( esRoleValido ) , // (rol) => esRoleValido(rol)
    validarCampos
], usuariosPost );

router.put('/:id', [
    check('id','No es un Id válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ) ,
    validarCampos
],
usuariosPut );

router.patch('/', usuariosPatch );

router.delete('/:id', 
    check('id').custom(isValidObjectId),
    check('id','No es un Id válido').isMongoId(),
    validarCampos,
    check('id').custom( existeUsuarioPorId ),
    usuariosDelete );

module.exports= router;