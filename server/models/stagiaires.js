const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stagiairesSchema = new Schema({

    dateInscription: Date,
    dateDemarrage: Date,
    dateFin: Date,
    compte: String,
    formation: String,
    ordinateurs:String,
    ordinateurPret: {
        datePret: Date,
        dateRestitution: Date
    }
});

module.exports = mongoose.model('stagiaires', stagiairesSchema);