import { gql } from '@apollo/client';

////////////////////  Comptes 
export const getComptes = gql`
  query ComptesQuery {
    comptes {
    id
    nom
    prenom
    avatarId
    role

  }
  }
`;

export const getCompteDetail = gql`
query CompteDetailQuery($id: ID!) {
  compte(id: $id) {
    id
    email
    nom
    prenom
    telephone
    adresse {
      libelle1
      libelle2
      codePostal
      ville
    }
    role
    role_def {
      description
      credentials
    }
    dates_role
    avatarId
    modules {
      libelle
      reference
      description
      formation {
        reference
        libelle
        dateDebut
        dateFin
      }
    }
    stagiaire {
      dateInscription
      dateDemarrage
      dateFin
      formation {
        reference
        libelle
        dateDebut
        dateFin
      }
    }
  }
}
`;


export const postCompte = gql`
mutation CompteCreationQuery(
  $nom: String
  $prenom: String
  $email: String
  $telephone: String
  $motDePasse: String
  $adresse: AdresseType
  $role:String
  $role_def:RoleType
  $dates_role: String
  $avatarId: String
) {
  addCompte(
    nom: $nom
    prenom: $prenom
    email: $email
    telephone: $telephone
    motDePasse: $motDePasse
    adresse: $adresse
    role: $role
    role_def:$role_def
    dates_role: $dates_role
    avatarId: $avatarId
  ) {
    nom
    prenom
    email
    telephone
    adresse {
      libelle1
      libelle2
      codePostal
      ville
    }
    role
    role_def {
      description
      credentials
    }
    dates_role
    avatarId
  }
}
`;

export const modifCompte = gql`
mutation UpdateCompteMutation(
  $id: ID
  $nom: String
  $prenom: String
  $email: String
  $telephone: String
  $adresse: AdresseType
  $role:String
  $role_def:RoleType
  $avatarId: String
) {
  updateCompte(
    id: $id
    nom: $nom
    prenom: $prenom
    email: $email
    telephone: $telephone
    adresse: $adresse
    role:$role
    role_def:$role_def
    avatarId: $avatarId
  ) {
    id
    nom
    prenom
    email
    telephone
    adresse {
      libelle1
      libelle2
      codePostal
      ville
    }
    role
    role_def {
      description
      credentials
    }
    avatarId
  }
}
`;


/////Suppression d'un compte
export const deleteCompte = gql`
mutation DeleteCompteMutation($id: ID) {
  deleteCompte(id: $id) {
    id
  }
}
`;

/////////////////////////////////////// Formations /////////////

export const getFormations = gql`
query FormationQuery {
  formations {
    id
    reference
    libelle
    dateDebut
    dateFin
    adressesformation {
      ville
    }
  }
}
`;

export const getFormationDetail = gql`
query FormationDetailQuery($id: ID!) {
  formation(id: $id) {
    id
    reference
    libelle
    dateDebut
    dateFin
    participants
    adressesformation {
      libelle1
      libelle2
      codePostal
      ville
    }
    formationmodes {
      libelle
      description
    }
    responsable {
      nom
      prenom
    }
    stagiaires {
      compte {
        id
        nom
        prenom
      }
    }
    modules {
      id
      reference
      libelle
      description
      animateurId {
        id
        nom
        prenom
      }
    }
  }
}
`;

export const postFormation = gql`
mutation FormationCreationQuery(
  $reference: String
  $libelle:String
  $dateDebut:String
  $dateFin:String
  $participants:String
  $adressesformation:String
  $formationmodes:String
  $responsable:String
) {
  addFormation(
    reference: $reference
    libelle:$libelle
    dateDebut:$dateDebut
    dateFin:$dateFin
    participants:$participants
    adressesformation:$adressesformation
    formationmodes:$formationmodes
    responsable:$responsable
    
  ) {
    reference
    libelle
    dateDebut
    dateFin
    participants
    adressesformation {
      id
    }
    formationmodes {
      id
    }
    responsable {
      id
    }
  }
}
`;

export const UpdateFormation = gql`
mutation UpdateFormationMutation(
  $id:ID
  $reference: String
  $libelle:String
  $dateDebut:String
  $dateFin:String
  $participants:String
  $adressesformation:String
  $formationmodes:String
  $responsable:String
) {
  updateFormation(
    id:$id
    reference: $reference
    libelle:$libelle
    dateDebut:$dateDebut
    dateFin:$dateFin
    participants:$participants
    adressesformation:$adressesformation
    formationmodes:$formationmodes
    responsable:$responsable
    
  ) {
    reference
    libelle
    dateDebut
    dateFin
    participants
    adressesformation {
      id
    }
    formationmodes {
      id
    }
    responsable {
      id
    }
  }
}
`;

export const deleteFormation = gql`
mutation DeleteFormationMutation($id: ID) {
  deleteFormation(id: $id) {
    id
  }
}
`;

/////////////////////////////// Seances /////////////////////////
export const getSeances = gql`
query getSeancesquery {
  seances {
    id
    date
    duree
    contenu
    module {
      reference
      libelle
      description
      formation {
        id
        reference
        libelle
        dateDebut
        dateFin
      }
      animateurId {
        id
        nom
        prenom
      }
    }
  }
}
`;

export const getSeanceDetail = gql`
query getSeanceDetail($id: ID!) {
  seance(id: $id) {
    id
    date
    duree
    contenu
    contenuRespecte
    contenuCommentaire
    timing
    timingRespecte
    timingCommentaire
    condition
    conditionRespecte
    conditionCommentaire
    evaluation
    evaluationRespecte
    evaluationCommentaire
    comprehension
    comprehensionRespecte
    comprehensionCommentaire
    participationRespecte
    assiduite
    vieGroupe
    module {
      reference
      libelle
      formation {
        reference
        libelle
      }
      animateurId {
        id
        nom
        prenom
       }
    }
    typeseance {
      libelle
      description
    }
    commentaireLibre
  }
}

`;

export const postSeance = gql`
mutation seanceCreationMutation(
  $date: String
  $duree: String
  $contenu: String
  $contenuRespecte: String
  $contenuCommentaire: String
  $timing: String
  $timingRespecte: String
  $timingCommentaire: String
  $condition: String
  $conditionRespecte: String
  $conditionCommentaire: String
  $evaluation: String
  $evaluationRespecte: String
  $evaluationCommentaire: String
  $comprehension: String
  $comprehensionRespecte: String
  $comprehensionCommentaire: String
  $participationRespecte: String
  $assiduite: String
  $vieGroupe: String
  $module: String
  $animateurId:String
  $typeseance: String
  $commentaireLibre:String
) {
  addSeance(
    date: $date
    duree: $duree
    contenu: $contenu
    contenuRespecte: $contenuRespecte
    contenuCommentaire: $contenuCommentaire
    timing: $timing
    timingRespecte: $timingRespecte
    timingCommentaire: $timingCommentaire
    condition: $condition
    conditionRespecte: $conditionRespecte
    conditionCommentaire: $conditionCommentaire
    evaluation: $evaluation
    evaluationRespecte: $evaluationRespecte
    evaluationCommentaire: $evaluationCommentaire
    comprehension: $comprehension
    comprehensionRespecte: $comprehensionRespecte
    comprehensionCommentaire: $comprehensionCommentaire
    participationRespecte: $participationRespecte
    assiduite: $assiduite
    vieGroupe: $vieGroupe
    module: $module
    animateurId:$animateurId
    typeseance: $typeseance
    commentaireLibre:$commentaireLibre
  ) {
    date
    duree
    contenu
    contenuRespecte
    contenuCommentaire
    timing
    timingRespecte
    timingCommentaire
    condition
    conditionRespecte
    conditionCommentaire
    evaluation
    evaluationRespecte
    evaluationCommentaire
    comprehension
    comprehensionRespecte
    comprehensionCommentaire
    participationRespecte
    assiduite
    vieGroupe
    module {
      id
    }
    animateurId {
      id
    }
    typeseance {
      id
    }
    commentaireLibre
  }
}
`;

export const updateSeance = gql`
mutation updateSeanceMutation(
  $id:ID!
  $date: String
  $duree: String
  $contenu: String
  $contenuRespecte: String
  $contenuCommentaire: String
  $timing: String
  $timingRespecte: String
  $timingCommentaire: String
  $condition: String
  $conditionRespecte: String
  $conditionCommentaire: String
  $evaluation: String
  $evaluationRespecte: String
  $evaluationCommentaire: String
  $comprehension: String
  $comprehensionRespecte: String
  $comprehensionCommentaire: String
  $participationRespecte: String
  $assiduite: String
  $vieGroupe: String
  $module: String
  $animateurId:String
  $typeseance: String
  $commentaireLibre:String
) {
  updateSeance(
    id:$id
    date: $date
    duree: $duree
    contenu: $contenu
    contenuRespecte: $contenuRespecte
    contenuCommentaire: $contenuCommentaire
    timing: $timing
    timingRespecte: $timingRespecte
    timingCommentaire: $timingCommentaire
    condition: $condition
    conditionRespecte: $conditionRespecte
    conditionCommentaire: $conditionCommentaire
    evaluation: $evaluation
    evaluationRespecte: $evaluationRespecte
    evaluationCommentaire: $evaluationCommentaire
    comprehension: $comprehension
    comprehensionRespecte: $comprehensionRespecte
    comprehensionCommentaire: $comprehensionCommentaire
    participationRespecte: $participationRespecte
    assiduite: $assiduite
    vieGroupe: $vieGroupe
    module: $module
    animateurId:$animateurId
    typeseance: $typeseance
    commentaireLibre:$commentaireLibre
  ) {
    id
    date
    duree
    contenu
    contenuRespecte
    contenuCommentaire
    timing
    timingRespecte
    timingCommentaire
    condition
    conditionRespecte
    conditionCommentaire
    evaluation
    evaluationRespecte
    evaluationCommentaire
    comprehension
    comprehensionRespecte
    comprehensionCommentaire
    participationRespecte
    assiduite
    vieGroupe
    module {
      id
    }
    animateurId {
      id
    }
    typeseance {
      id
    }
    commentaireLibre
  }
}

`;

/////////////////////////////Stagiaires ////////////////////////
export const getStagiaires = gql`
query StagiairesQuery {
  stagiaires {
    id
    dateInscription
    dateDemarrage
    dateFin
    compte {
      id
      email
      nom
      prenom
      avatarId
    }
    formation {
      id
      reference
      libelle
      dateDebut
      dateFin
    }
    ordinateurs {
      id
      libelle
      numeroSerie
      souris
    }
    ordinateurPret {
      datePret
      dateRestitution
    }
  }
}
`;

/////Suppression d'un compte
export const deleteStagiaire = gql`
mutation DeleteStagiaireMutation($id: ID) {
  deleteStagiaire(id: $id) {
    id
  }
}
`;
//////////////////////////// Animateurs ////////////////////////////
export const getAnimateurs = gql`
query AnimateursQuery {
    comptes {
      id
      prenom
      nom
      role
  }
}
`;

////////////////////////////// AdressesFormation ////////////////////////
export const getAdressesFormation = gql`
query AdressesFormation {
  adressesformations {
    id
    libelle1
    libelle2
    codePostal
    ville
  }
}
`;

///////////////////////////////  FormationModes //////////////////////////////
export const getFormationModes = gql`
query FormationModes {
  formationmodes {
    id
    libelle
    libelleCourt
    description
  }
}
`;

////////////////////////////////// Modules ///////////////////////////
export const getModules = gql`
query getModules {
  modules {
    id
    reference
    libelle
    description
    formation {
      id
      reference
      libelle
      dateDebut
      dateFin
    }
    animateurId {
    id
    nom
    prenom
    }
  }
}
`;

///////////////////////////// Typeseances /////////////////////////
export const getTypeSeance = gql`
query getTypeseance {
  typeseances {
    id
    libelleCourt
    libelle
    description
    actif
  }
}
`;
