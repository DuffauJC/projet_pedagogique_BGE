const graphql = require('graphql');
const graphqldate = require('graphql-iso-date');
const bcrypt = require('bcrypt'); //  cryptage mdp


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLScalarType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType
} = graphql;

const {
    GraphQLDate,
} = graphqldate;

const Adressesformation = require('../models/adressesformation');
const Comptes = require('../models/comptes');
const Ordinateurs = require('../models/ordinateurs');
const Formations = require('../models/formations');
const Formationmodes = require('../models/formationmodes');
const Modules = require('../models/modules');
const Seances = require('../models/seances');
const Stagiaires = require('../models/stagiaires');
const Typeseance = require('../models/typeseances');





/////////////////////////shemaTypes///////////////////////////////

const AdressesformationType = new GraphQLObjectType({
    name: 'AdressesformationType',
    fields: () => ({
        id: { type: GraphQLID },
        libelle1: { type: GraphQLString },
        libelle2: { type: GraphQLString },
        codePostal: { type: GraphQLString },
        ville: { type: GraphQLString }
    })
});


const ComptesType = new GraphQLObjectType({
    name: 'ComptesType',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        motDePasse: { type: GraphQLString },
        nom: { type: GraphQLString },
        prenom: { type: GraphQLString },
        telephone: { type: GraphQLString },
        adresse: {
            type: new GraphQLObjectType({
                name: 'Adresse',
                fields: () => ({
                    libelle1: { type: GraphQLString },
                    libelle2: { type: GraphQLString },
                    codePostal: { type: GraphQLString },
                    ville: { type: GraphQLString },
                })
            })
        },
        role: { type: GraphQLString },
        role_def: {
            type: new GraphQLObjectType({
                name: 'Role',
                fields: () => ({
                    description: { type: GraphQLString },
                    credentials: { type: GraphQLString },

                })
            })
        },
        dates_role: { type: GraphQLDate },
        avatarId: { type: GraphQLString },
        modules: {
            type: new GraphQLList(ModulesType),
            resolve(parent, args) {
                return Modules.find({ animateurId: parent.id });
            }
        },
        stagiaire: {
            type: new GraphQLList(StagiairesType),
            resolve(parent, args) {
                return Stagiaires.find({ compte: parent.id });
            }
        },
    })
});


const FormationsType = new GraphQLObjectType({
    name: 'FormationsType',
    fields: () => ({
        id: { type: GraphQLID },
        reference: { type: GraphQLString },
        libelle: { type: GraphQLString },
        dateDebut: { type: GraphQLDate },
        dateFin: { type: GraphQLDate },
        participants: { type: GraphQLInt },
        adressesformation: {
            type: AdressesformationType,
            resolve(parent, args) {
                return Adressesformation.findById(parent.adressesformation);
            }
        },
        formationmodes: {
            type: FormationmodesType,
            resolve(parent, args) {
                return Formationmodes.findById(parent.formationmodes);
            }
        },
        responsable: {
            type: ComptesType,
            resolve(parent, args) {
                return Comptes.findById(parent.responsable);
            }
        },
        stagiaires: {
            type: new GraphQLList(StagiairesType),
            resolve(parent, args) {
                return Stagiaires.find({ formation: parent.id });
            }
        },
        animateurs: {
            type: new GraphQLList(ModulesType),
            resolve(parent, args) {
                return Modules.find({ animateurId });
            }
        },
        modules: {
            type: new GraphQLList(ModulesType),
            resolve(parent, args) {
                return Modules.find({ formation: parent.id });
            }
        },
    })
});

const FormationmodesType = new GraphQLObjectType({
    name: 'FormationmodesType',
    fields: () => ({
        id: { type: GraphQLID },
        libelle: { type: GraphQLString },
        libelleCourt: { type: GraphQLString },
        description: { type: GraphQLString },
        actif: { type: graphql.GraphQLBoolean },
    })
});

const ModulesType = new GraphQLObjectType({
    name: 'ModulesType',
    fields: () => ({
        id: { type: GraphQLID },
        reference: { type: GraphQLString },
        libelle: { type: GraphQLString },
        description: { type: GraphQLString },
        formation: {
            type: FormationsType,
            resolve(parent, args) {
                return Formations.findById(parent.formation);
            }
        },
        animateurId: {
            type: ComptesType,
            resolve(parent, args) {
                return Comptes.findById(parent.animateurId);
            }
        },
        seances: {
            type: new GraphQLList(SeancesType),
            resolve(parent, args) {
                return Seances.find({ module: parent.id });
            }
        },
    })
});

const OrdinateursType = new GraphQLObjectType({
    name: 'OrdinateursType',
    fields: () => ({
        id: { type: GraphQLID },
        libelle: { type: GraphQLString },
        numeroSerie: { type: GraphQLString },
        souris: { type: GraphQLInt }
    })
});


const SeancesType = new GraphQLObjectType({
    name: 'SeancesType',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLDate },
        duree: { type: GraphQLString },
        contenu: { type: GraphQLString },
        contenuRespecte: { type: GraphQLString },
        contenuCommentaire: { type: GraphQLString },
        timing: { type: GraphQLString },
        timingRespecte: { type: GraphQLString },
        timingCommentaire: { type: GraphQLString },
        condition: { type: GraphQLString },
        conditionRespecte: { type: GraphQLString },
        conditionCommentaire: { type: GraphQLString },
        evaluation: { type: GraphQLString },
        evaluationRespecte: { type: GraphQLString },
        evaluationCommentaire: { type: GraphQLString },
        comprehension: { type: GraphQLString },
        comprehensionRespecte: { type: GraphQLString },
        comprehensionCommentaire: { type: GraphQLString },
        participationRespecte: { type: GraphQLString },
        assiduite: { type: GraphQLString },
        vieGroupe: { type: GraphQLString },
        module: {
            type: ModulesType,
            resolve(parent, args) {
                return Modules.findById(parent.module);
            }
        },
        animateurId: {
            type: ComptesType,
            resolve(parent, args) {
                return Comptes.findById(parent.animateurId);
            }
        },
        typeseance: {
            type: TypeSeanceType,
            resolve(parent, args) {
                return Typeseance.findById(parent.typeseance);
            }
        },
        commentaireLibre: { type: GraphQLString },


    })
});

const StagiairesType = new GraphQLObjectType({
    name: 'StagiairesType',
    fields: () => ({
        id: { type: GraphQLID },
        dateInscription: { type: GraphQLDate },
        dateDemarrage: { type: GraphQLDate },
        dateFin: { type: GraphQLDate },
        compte: {
            type: ComptesType,
            resolve(parent, args) {
                return Comptes.findById(parent.compte);
            }
        },
        formation: {
            type: FormationsType,
            resolve(parent, args) {
                return Formations.findById(parent.formation);
            }
        },
        ordinateurs: {
            type: OrdinateursType,
            resolve(parent, args) {
                return Ordinateurs.findById(parent.ordinateurs);
            }
        },
        ordinateurPret: {
            type: new GraphQLObjectType({
                name: 'DatesOrdinateurs',
                fields: () => ({
                    datePret: { type: GraphQLDate },
                    dateRestitution: { type: GraphQLDate }

                })
            })

        }
    })
});

const TypeSeanceType = new GraphQLObjectType({
    name: 'TypeSeanceType',
    fields: () => ({
        id: { type: GraphQLID },
        libelleCourt: { type: GraphQLString },
        libelle: { type: GraphQLString },
        description: { type: GraphQLString },
        actif: { type: GraphQLInt },
    })
});

////////////////////////// Requêtes d'appel/////////////////////////

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        adressesformations: {
            type: new GraphQLList(AdressesformationType),
            resolve() {
                return Adressesformation.find({});
            }
        },
        adressesformation: {
            type: AdressesformationType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Adressesformation.findById(id);
            }
        },
        comptes: {
            type: new GraphQLList(ComptesType),
            resolve() {
                return Comptes.find({});
            }
        },
        compte: {
            type: ComptesType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Comptes.findById(id);
            }
        },
        formations: {
            type: new GraphQLList(FormationsType),
            resolve() {
                return Formations.find({});
            }
        },
        formation: {
            type: FormationsType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Formations.findById(id);
            }
        },
        formationmodes: {
            type: new GraphQLList(FormationmodesType),
            resolve() {
                return Formationmodes.find({});
            }
        },
        formationmode: {
            type: FormationmodesType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Formationmodes.findById(id);
            }
        },
        modules: {
            type: new GraphQLList(ModulesType),
            resolve() {
                return Modules.find({});
            }
        },
        module: {
            type: ModulesType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Modules.findById(id);
            }
        },
        ordinateurs: {
            type: new GraphQLList(OrdinateursType),
            resolve() {
                return Ordinateurs.find({});
            }
        },
        ordinateur: {
            type: OrdinateursType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Ordinateurs.findById(id);
            }
        },
        seances: {
            type: new GraphQLList(SeancesType),
            resolve(context) {
                return Seances.find();  
            }
        },
        seance: {
            type: SeancesType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Seances.findById(id);
            }
        },
        stagiaires: {
            type: new GraphQLList(StagiairesType),
            resolve() {
                return Stagiaires.find({});
            }
        },
        stagiaire: {
            type: StagiairesType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Stagiaires.findById(id);
            }
        },
        typeseances: {
            type: new GraphQLList(TypeSeanceType),
            resolve() {
                return Typeseance.find({});
            }
        },

    })
});

///////////////////////Schéma pour Mutations /////////////////////////////////
// type Input .....

const AdresseType = new GraphQLInputObjectType({
    name: 'AdresseType',
    fields: () => ({
        libelle1: { type: GraphQLString },
        libelle2: { type: GraphQLString },
        codePostal: { type: GraphQLString },
        ville: { type: GraphQLString },
    })
});

const DatesOrdinateursType = new GraphQLInputObjectType({
    name: 'DatesOrdinateursType',
    fields: () => ({
        datePret: { type: GraphQLString },
        dateRestitution: { type: GraphQLString },
    })
});

const RoleType = new GraphQLInputObjectType({
    name: 'RoleType',
    fields: () => ({
        description: { type: GraphQLString },
        credentials: { type: GraphQLString },
    })
});


////////////////////////// Mutations  requêtes de mise à jour de la bdd //////////////////////

const Mutation = new GraphQLObjectType({

    name: 'Mutation',
    fields: () => ({
        /////////////////////  Lieu de formation /////////////////////////
        ///// création lieu de formation
        addAdresseFormation: {
            type: AdressesformationType,
            args: {
                libelle1: { type: GraphQLString },
                libelle2: { type: GraphQLString },
                codePostal: { type: GraphQLString },
                ville: { type: GraphQLString }
            },
            resolve(parentValue, { libelle1, libelle2, codePostal, ville }) {
                return (new Adressesformation({ libelle1, libelle2, codePostal, ville })).save().then((response) => {
                    return response;
                }).catch((erreur) => {
                    return new Error("Cette adresse existe déja.");
                });
            }
        },
        ///// modification d'un lieu de formation
        updateAdresseFormation: {
            type: AdressesformationType,
            args: {
                id: { type: GraphQLID },
                libelle1: { type: GraphQLString },
                libelle2: { type: GraphQLString },
                codePostal: { type: GraphQLString },
                ville: { type: GraphQLString }
            },
            resolve(parentValue, { id, libelle1, libelle2, codePostal, ville }) {
                return Adressesformation.findByIdAndUpdate(id, { $set: { libelle1, libelle2, codePostal, ville } }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cette adresse n'existe pas.");
                    });

            },
        },
        ///// suppression d'une adresseformation
        deleteAdresseFormation: {
            type: AdressesformationType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parentValue, { id }) {
                return Adressesformation.deleteOne({ _id: id })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cette adresse n'existe pas.");
                    });
            }
        },


        /////////////////////  Compte /////////////////////////
        ///// création d'un compte
        addCompte: {
            type: ComptesType,
            args: {
                email: { type: GraphQLString },
                motDePasse: { type: GraphQLString },
                nom: { type: GraphQLString },
                prenom: { type: GraphQLString },
                telephone: { type: GraphQLString },
                adresse: {
                    type: AdresseType,
                    args: {
                        libelle1: { type: GraphQLString },
                        libelle2: { type: GraphQLString },
                        codePostal: { type: GraphQLString },
                        ville: { type: GraphQLString },
                    }
                },
                role: { type: GraphQLString },
                role_def: {
                    type: RoleType,
                    args: {
                        description: { type: GraphQLString },
                        credentials: { type: GraphQLString },

                    }
                },
                dates_role: { type: GraphQLString },
                avatarId: { type: GraphQLString },
            },
            resolve(parentValue, { email, motDePasse, nom, prenom, telephone, adresse, role, role_def, dates_role, avatarId }) {
                const compte = new Comptes({ email, motDePasse, nom, prenom, telephone, adresse, role, role_def, dates_role, avatarId })
                const saltRounds = 10;
                bcrypt.hash(compte.motDePasse, saltRounds, (err, hash) => {
                    if (err) throw err;
                    compte.motDePasse = hash;
                    compte.save().then((response) => {
                        return response;
                    }).catch((error) => {
                        return new Error("Ce compte n'existe pas.");
                    })
                })
                return compte
            },

        },
        ///// modification d'un compte
        updateCompte: {
            type: ComptesType,
            args: {
                id: { type: GraphQLID },
                email: { type: GraphQLString },
                nom: { type: GraphQLString },
                prenom: { type: GraphQLString },
                telephone: { type: GraphQLString },
                adresse: {
                    type: AdresseType,
                    args: {
                        libelle1: { type: GraphQLString },
                        libelle2: { type: GraphQLString },
                        codePostal: { type: GraphQLString },
                        ville: { type: GraphQLString },
                    }
                },
                role: { type: GraphQLString },
                role_def: {
                    type: RoleType,
                    args: {
                        description: { type: GraphQLString },
                        credentials: { type: GraphQLString },

                    }
                },
                avatarId: { type: GraphQLString },
            },
            resolve(parentValue, { id, email, nom, prenom, telephone, adresse, role, role_def, avatarId }) {
                return Comptes.findByIdAndUpdate(id, { $set: { email, nom, prenom, telephone, adresse, role, role_def, avatarId } }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Ce compte n'existe pas.");
                    });


            },
        },
        /////Suppression d'un compte
        deleteCompte: {
            type: ComptesType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parentValue, { id }) {
                return Comptes.deleteOne({ _id: id })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Ce compte n'existe pas.");
                    });

            },

        },

        ////////////////////// Formation /////////////////////
        ///// création d'une formation
        addFormation: {
            type: FormationsType,
            args: {
                reference: { type: GraphQLString },
                libelle: { type: GraphQLString },
                dateDebut: { type: GraphQLString },
                dateFin: { type: GraphQLString },
                participants: { type: GraphQLString },
                adressesformation: { type: GraphQLString },
                formationmodes: { type: GraphQLString },
                responsable: { type: GraphQLString }
            },
            resolve(parentValue, { reference, libelle, dateDebut, dateFin, participants, adressesformation, formationmodes, responsable }) {
                return (new Formations({ reference, libelle, dateDebut, dateFin, participants, adressesformation, formationmodes, responsable })
                ).save().then((response) => {
                    return response;
                }).catch((erreur) => {
                    return new Error("Cette formation existe déja.");
                });

            },
        },
        ///// modification d'une formation
        updateFormation: {
            type: FormationsType,
            args: {
                id: { type: GraphQLID },
                reference: { type: GraphQLString },
                libelle: { type: GraphQLString },
                dateDebut: { type: GraphQLString },
                dateFin: { type: GraphQLString },
                participants: { type: GraphQLString },
                adressesformation: { type: GraphQLString },
                formationmodes: { type: GraphQLString },
                responsable: { type: GraphQLString }
            },
            resolve(parentValue, { id, reference, libelle, dateDebut, dateFin, participants, adressesformation, formationmodes, responsable }) {
                return Formations.findByIdAndUpdate(id, { $set: { reference, libelle, dateDebut, dateFin, participants, adressesformation, formationmodes, responsable } }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cette formation n'existe pas.");
                    });

            },
        },
        ///// suppression d'une formation
        deleteFormation: {
            type: FormationsType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parentValue, { id }) {
                return Formations.deleteOne({ _id: id })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cette formation n'existe pas.");
                    });
            }
        },
        ////////////////////////////// Module ////////////////////////////////////
        ///// création d'un module
        addModule: {
            type: ModulesType,
            args: {
                reference: { type: GraphQLString },
                libelle: { type: GraphQLString },
                description: { type: GraphQLString },
                formation: { type: GraphQLString },
                animateurId: { type: GraphQLString },
            },
            resolve(parentValue, { reference, libelle, description, formation, animateurId }) {
                return (new Modules({ reference, libelle, description, formation, animateurId })
                ).save().then((response) => {
                    return response;
                }).catch((erreur) => {
                    return new Error("Ce module existe déja.");
                });
            },
        },
        ///// modification d'un module
        updateModule: {
            type: ModulesType,
            args: {
                id: { type: GraphQLID },
                reference: { type: GraphQLString },
                libelle: { type: GraphQLString },
                description: { type: GraphQLString },
                formation: { type: GraphQLString },
                animateurId: { type: GraphQLString },
            },
            resolve(parentValue, { id, reference, libelle, description, formation, animateurId }) {
                return Ordinateurs.findByIdAndUpdate(id, { $set: { reference, libelle, description, formation, animateurId } }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Ce module n'existe pas.");
                    });

            },
        },
        ///// suppression d'un module
        deleteModule: {
            type: ModulesType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parentValue, { id }) {
                return Modules.deleteOne({ _id: id })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Ce module n'existe pas.");
                    });
            }
        },
        ////////////////////////////// Ordinateur ////////////////////////////////////
        ///// création d'un ordinateur
        addOrdinateur: {
            type: OrdinateursType,
            args: {
                libelle: { type: GraphQLString },
                numeroSerie: { type: GraphQLString },
                souris: { type: GraphQLInt }
            },
            resolve(parentValue, { libelle, numeroSerie, souris }) {
                return (new Ordinateurs({ libelle, numeroSerie, souris })
                ).save().then((response) => {
                    return response;
                }).catch((erreur) => {
                    return new Error("Cet ordinateur existe déja.");
                });

            },
        },
        updateOrdinateur: {
            type: OrdinateursType,
            args: {
                id: { type: GraphQLID },
                libelle: { type: GraphQLString },
                numeroSerie: { type: GraphQLString },
                souris: { type: GraphQLInt }
            },
            resolve(parentValue, { id, libelle, numeroSerie, souris }) {
                return Ordinateurs.findByIdAndUpdate(id, { $set: { libelle, numeroSerie, souris } }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cet ordinateur n'existe pas.");
                    });

            },
        },
        ///// suppression d'un ordinateur
        deleteOrdinateur: {
            type: OrdinateursType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parentValue, { id }) {
                return Ordinateurs.deleteOne({ _id: id })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cet ordinateur n'existe pas.");
                    });
            }
        },

        ////////////////////////////// Seances ////////////////////////////////////
        ///// création d'une séance (fiche journalières)
        addSeance: {
            type: SeancesType,
            args: {
                date: { type: GraphQLString },
                duree: { type: GraphQLString },
                contenu: { type: GraphQLString },
                contenuRespecte: { type: GraphQLString },
                contenuCommentaire: { type: GraphQLString },
                timing: { type: GraphQLString },
                timingRespecte: { type: GraphQLString },
                timingCommentaire: { type: GraphQLString },
                condition: { type: GraphQLString },
                conditionRespecte: { type: GraphQLString },
                conditionCommentaire: { type: GraphQLString },
                evaluation: { type: GraphQLString },
                evaluationRespecte: { type: GraphQLString },
                evaluationCommentaire: { type: GraphQLString },
                comprehension: { type: GraphQLString },
                comprehensionRespecte: { type: GraphQLString },
                comprehensionCommentaire: { type: GraphQLString },
                participationRespecte: { type: GraphQLString },
                assiduite: { type: GraphQLString },
                vieGroupe: { type: GraphQLString },
                module: { type: GraphQLString },
                animateurId: { type: GraphQLString },
                typeseance: { type: GraphQLString },
                commentaireLibre: { type: GraphQLString },
            },
            resolve(parentValue, { date, duree, contenu, contenuRespecte, contenuCommentaire,
                timing, timingRespecte, timingCommentaire,
                condition, conditionRespecte, conditionCommentaire,
                evaluation, evaluationRespecte, evaluationCommentaire,
                comprehension, comprehensionRespecte, comprehensionCommentaire,
                participationRespecte, horaire, assiduite, vieGroupe,
                module, animateurId, typeseance, commentaireLibre }) {
                return (new Seances({
                    date, duree, contenu, contenuRespecte, contenuCommentaire,
                    timing, timingRespecte, timingCommentaire,
                    condition, conditionRespecte, conditionCommentaire,
                    evaluation, evaluationRespecte, evaluationCommentaire,
                    comprehension, comprehensionRespecte, comprehensionCommentaire,
                    participationRespecte, horaire, assiduite, vieGroupe,
                    module, animateurId, typeseance, commentaireLibre
                })
                ).save().then((response) => {
                    return response;
                }).catch((erreur) => {
                    return new Error("Cette seance existe déja.");
                });

            },

        },
        ///// modification d'une séance (fiche journalières)
        updateSeance: {
            type: SeancesType,
            args: {
                id: { type: GraphQLID },
                date: { type: GraphQLString },
                duree: { type: GraphQLString },
                contenu: { type: GraphQLString },
                contenuRespecte: { type: GraphQLString },
                contenuCommentaire: { type: GraphQLString },
                timing: { type: GraphQLString },
                timingRespecte: { type: GraphQLString },
                timingCommentaire: { type: GraphQLString },
                condition: { type: GraphQLString },
                conditionRespecte: { type: GraphQLString },
                conditionCommentaire: { type: GraphQLString },
                evaluation: { type: GraphQLString },
                evaluationRespecte: { type: GraphQLString },
                evaluationCommentaire: { type: GraphQLString },
                comprehension: { type: GraphQLString },
                comprehensionRespecte: { type: GraphQLString },
                comprehensionCommentaire: { type: GraphQLString },
                participationRespecte: { type: GraphQLString },
                assiduite: { type: GraphQLString },
                vieGroupe: { type: GraphQLString },
                module: { type: GraphQLString },
                animateurId: { type: GraphQLString },
                typeseance: { type: GraphQLString },
                commentaireLibre: { type: GraphQLString },
            },
            resolve(parentValue, { id, date, duree, contenu, contenuRespecte, contenuCommentaire,
                timing, timingRespecte, timingCommentaire,
                condition, conditionRespecte, conditionCommentaire,
                evaluation, evaluationRespecte, evaluationCommentaire,
                comprehension, comprehensionRespecte, comprehensionCommentaire,
                participationRespecte, horaire, assiduite, vieGroupe,
                module, animateurId, typeseance, commentaireLibre }) {
                return Seances.findByIdAndUpdate(id, {
                    $set: {
                        date, duree, contenu, contenuRespecte, contenuCommentaire,
                        timing, timingRespecte, timingCommentaire,
                        condition, conditionRespecte, conditionCommentaire,
                        evaluation, evaluationRespecte, evaluationCommentaire,
                        comprehension, comprehensionRespecte, comprehensionCommentaire,
                        participationRespecte, horaire, assiduite, vieGroupe,
                        module, animateurId, typeseance, commentaireLibre
                    }
                }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cette seance n'existe pas.");
                    });

            },
        },
        ///// suppression d'une seance
        deleteSeance: {
            type: SeancesType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parentValue, { id }) {
                return Seances.deleteOne({ _id: id })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cete seance n'existe pas.");
                    });
            }
        },
        ////////////////////////////// Stagiaire ////////////////////////////////////
        ///// création d'un stagiaire
        addStagiaire: {
            type: StagiairesType,
            args: {
                dateInscription: { type: GraphQLString },
                dateDemarrage: { type: GraphQLString },
                dateFin: { type: GraphQLString },
                comptes: { type: GraphQLString },
                formation: { type: GraphQLString },
                ordinateurs: { type: GraphQLString },
                ordinateurPret: {
                    type: DatesOrdinateursType,
                    args: {
                        datePret: { type: GraphQLString },
                        dateRestitution: { type: GraphQLString }
                    }
                }
            },
            resolve(parentValue, { dateInscription, dateDemarrage,
                dateFin, comptes, formation, ordinateurs, ordinateurPret }) {
                return (new Stagiaires({
                    dateInscription, dateDemarrage,
                    dateFin, comptes, formation, ordinateurs, ordinateurPret
                })
                ).save().then((response) => {
                    return response;
                }).catch((erreur) => {
                    return new Error("Ce compte existe déja.");
                }

                )
            },
        },
        ///// modification d'un stagiaire
        updateStagiaire: {
            type: StagiairesType,
            args: {
                id: { type: GraphQLID },
                dateInscription: { type: GraphQLString },
                dateDemarrage: { type: GraphQLString },
                dateFin: { type: GraphQLString },
                comptes: { type: GraphQLString },
                formation: { type: GraphQLString },
                ordinateurs: { type: GraphQLString },
                ordinateurPret: {
                    type: DatesOrdinateursType,
                    args: {
                        datePret: { type: GraphQLString },
                        dateRestitution: { type: GraphQLString }
                    }
                }
            },
            resolve(parentValue, { id, dateInscription, dateDemarrage, dateFin, comptes, formation, ordinateurs, ordinateurPret }) {
                return Stagiaires.findByIdAndUpdate(id, { $set: { dateInscription, dateDemarrage, dateFin, comptes, formation, ordinateurs, ordinateurPret } }, { new: true })
                    .then((response) => {
                        return response;
                    }).catch((erreur) => {
                        return new Error("Cette seance n'existe pas.");
                    });

            },

        },


    })
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});