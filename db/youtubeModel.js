const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
   code:{
        type: 'string',
        required: true
    },
    name:{
        type:'string',
        required: true
    }     
})
module.exports = mongoose.model('datos',dataSchema)