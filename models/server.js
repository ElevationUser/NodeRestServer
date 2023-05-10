const express = require('express');
var cors = require('cors')
let colors = require('colors');

class Server{
    constructor(){
        this.app=express();
        this.port=process.env.PORT || 3000;
        this.usuariosPath='/api/usuarios';

        //MidleWares
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //cors | se debe configurar Listas blancas/negras
        this.app.use(cors())

        //Lectura y Parseo del Body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') );
    }

    //Rutas
    routes(){
        this.app.use(this.usuariosPath,require('../routes/usuarios.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`.green);
        })
    }
}

module.exports=Server;
