const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seanceSchema = new Schema({

    date: Date,
    duree: String,
    contenu: String,
    contenuRespecte: String,
    contenuCommentaire: String,
    timing: String,
    timingRespecte: String,
    timingCommentaire: String,
    condition: String,
    conditionRespecte: String,
    conditionCommentaire: String,
    evaluation: String,
    evaluationRespecte: String,
    evaluationCommentaire: String,
    comprehension: String,
    comprehensionRespecte: String,
    comprehensionCommentaire: String,
    participationRespecte: String,
    assiduite: String,
    vieGroupe: String,
    module: String,
    animateurId:String,
    typeseance: String,
    commentaireLibre:String
});

module.exports = mongoose.model('seance', seanceSchema);