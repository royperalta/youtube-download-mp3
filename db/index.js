const express = require('express')
const routes = require('./routerYoutube');
const connectBD = require('./db')
const dotenv = require('dotenv')

//load Config
dotenv.config({ path: 'config.env' })

connectBD()

const app = express()
app.use(express.json())
app.use('/api', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`funcionando en el puerto: ${PORT}`)
})
/* const uri = process.env.URL_MONGO
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */



/* const mongoString = process.env.URL_MONGO
console.log(mongoString)
mongoose.connect(mongoString)
const database = mongoose.connection;
database.on('error', err => console.error)
database.once('connected', () => {console.log("Database Connected")
}) */

