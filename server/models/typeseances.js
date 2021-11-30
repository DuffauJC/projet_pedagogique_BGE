const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeseanceSchema = new Schema({

    libelleCourt: String,
    libelle: String,
    description: String,
    actif: Number
});

module.exports = mongoose.model('typeseance', typeseanceSchema);