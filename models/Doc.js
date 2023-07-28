const { Schema, model} = require('mongoose');

const docSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    title: {
        type: String
    },

});

module.exports = model('Doc', docSchema);