const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adressesformationSchema = new Schema({
    
    libelle1: String,
    libelle2: String,
    codePostal: String,
    ville: String,
});

module.exports=mongoose.model('adressesformation', adressesformationSchema);