const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compteSchema = new Schema({
  email: String,
  motDePasse: String,
  nom: String,
  prenom: String,
  telephone: String,
  adresse: {
    libelle1: String,
    libelle2: String,
    codePostal: String,
    ville: String,
  },
  role:String,
  role_def: {
    description: String,
    credentials: String
  },
  dates_role: Date,
  avatarId: String
});

module.exports = mongoose.model('compte', compteSchema);


