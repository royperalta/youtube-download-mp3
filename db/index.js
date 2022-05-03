const express = require('express')
const routes = require('./routerYoutube');
const connectBD = require('./db')
const dotenv = require('dotenv')
const cors = require('cors');
//load Config
dotenv.config({ path: 'config.env' })

connectBD()

const app = express()
app.use(cors());
app.use(express.json())

app.use('/api', routes)



/* app.use((req, res) => {
  res.append('Origin', 'http://localhost:3000');
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('GET', 'POST', 'OPTIONS');
  res.append('Content-Type', 'application/json');
  res.append('Accept', 'application/json');
}) */

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

