const { MongoClient } = require('mongodb')
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)

async function consulta(query){
    await client.connect()
    const database = client.db("youtube")
    const datos = database.collection("datos")
    return datos.findOne(query)
}

module.exports = consulta