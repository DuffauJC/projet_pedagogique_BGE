const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordinateursSchema = new Schema({

    libelle: String,
    numeroSerie: String,
    souris: Number

});

module.exports = mongoose.model('ordinateurs', ordinateursSchema);