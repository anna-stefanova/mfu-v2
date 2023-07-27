const { Schema, model} = require('mongoose');

const schema = new Schema({
    path: {
        type: String,
        required: true
    },
    title: {
        type: String
    },

});

module.exports = model('Doc', schema);