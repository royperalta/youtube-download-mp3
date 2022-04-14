'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChannelSchema = new Schema({
    codigo: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Channel', ChannelSchema);