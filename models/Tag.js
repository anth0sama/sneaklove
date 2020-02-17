const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
})

const tagModel = mongoose.model('User', tagSchema)

module.exports(tagModel); 