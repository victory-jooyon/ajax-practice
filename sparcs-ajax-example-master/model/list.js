const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: String,
    todo: String,
    date: Date
});

module.exports = mongoose.model('list', listSchema);