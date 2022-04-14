const mongoose = require('mongoose')
//Cha = mongoose.model('Channel')
const connectBD = async () => {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017',{
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