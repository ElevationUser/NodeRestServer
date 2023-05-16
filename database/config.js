const mongoose = require('mongoose');

const dbconnection = async ()=>{
try {
    await mongoose.connect(process.env.MONGODB_CNN,{
        useNewUrlPArser:true,
        useUnifiedTopology:true
    });
    console.log('DataBase OnLine.'.green);

} catch (error) {
    console.error(error);
    throw new Error('Error en la conexion de la BD');
}

}

module.exports= {
    dbconnection
};
