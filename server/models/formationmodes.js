const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationModesSchema = new Schema({

    libelle: String,
    libelleCourt: String,
    description: String,
    actif: Boolean

});

module.exports = mongoose.model('formationmodes', formationModesSchema);