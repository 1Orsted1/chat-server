const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temaSchema = Schema({
    name:String,
    date:String,
});

module.exports = mongoose.model("Theme", temaSchema);
