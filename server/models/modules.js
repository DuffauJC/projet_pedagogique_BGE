const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modulesSchema = new Schema({

    reference: String,
    libelle: String,
    description: String,
    formation: String,
    animateurId:String

});

module.exports = mongoose.model('modules', modulesSchema);