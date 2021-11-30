const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formationSchema = new Schema({
    
    reference: String,
    libelle: String,
    dateDebut: Date,
    dateFin: Date,
    participants: Number,
    adressesformation: String,
    formationmodes: String,
    responsable:String,

});

module.exports = mongoose.model('formation', formationSchema);