/* const {MongoClient} = require('mongodb');

const conectarDB = async () => {
    MongoClient.connect("mongodb://127.0.0.1:27017/youtube",()=>{
        console.log("Conectado")
    })    
}
module.exports = conectarDB */


const mongoose = require('mongoose')

const connectBD = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,            
        })

        console.log(`connected ${conn.connection.host}`)
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectBD