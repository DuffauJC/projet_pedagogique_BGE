import React from 'react'
import { getModules, getComptes, getTypeSeance, postSeance } from '../../graphql/query'
import { useQuery, useMutation } from '@apollo/client';


const SelectAnimateur = () => {
    const { loading, error, data } = useQuery(getComptes);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.comptes.map((compte) => {
            if (compte.role === "ANIMATEUR")
                return (
                    <option key={compte.id} value={compte.id}>
                        {compte.nom} {compte.prenom}
                    </option>
                )
        })

    } else {
        return "Chargement des données...";
    }
}

const SelectModule = () => {
    const { loading, error, data } = useQuery(getModules);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.modules.map((module) => {
            return (
                <option key={module.id} value={module.id}>
                    {module.reference}   {module.libelle} / {module.animateurId.nom}   {module.animateurId.prenom} / {module.formation.reference}   {module.formation.libelle}
                </option>
            )
        })

    } else {
        return "Chargement des données...";
    }
}

const SelectTypeSeance = () => {
    const { loading, error, data } = useQuery(getTypeSeance);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.typeseances.map((typeseance) => {
            return (
                <option key={typeseance.id} value={typeseance.id}>
                    Type de seance : {typeseance.libelleCourt} -- {typeseance.libelle}
                </option>
            )
        })

    } else {
        return "Chargement des données...";
    }
}


const Formulaire = () => {
    const [postseance] = useMutation(postSeance);
    const { loading, error, data } = useQuery(getModules);
    console.log(data);

    ///// Identifiants des imputs pour passer dans variables 
    let date
    let duree
    let contenu
    let contenuRespecte
    let contenuCommentaire
    let timing
    let timingRespecte
    let timingCommentaire
    let condition
    let conditionRespecte
    let conditionCommentaire
    let evaluation
    let evaluationRespecte
    let evaluationCommentaire
    let comprehension
    let comprehensionRespecte
    let comprehensionCommentaire
    let participationRespecte
    let assiduite
    let vieGroupe
    let module
    let animateurId
    let typeseance
    let commentaireLibre


    // Validation du formulaire
    const onSubmit = (event) => {
        event.preventDefault();
        postseance({
            variables: {
                date: date,
                duree: duree,
                contenu: contenu,
                contenuRespecte: contenuRespecte,
                contenuCommentaire: contenuCommentaire,
                timing: timing,
                timingRespecte: timingRespecte,
                timingCommentaire: timingCommentaire,
                condition: condition,
                conditionRespecte: conditionRespecte,
                conditionCommentaire: conditionCommentaire,
                evaluation: evaluation,
                evaluationRespecte: evaluationRespecte,
                evaluationCommentaire: evaluationCommentaire,
                comprehension: comprehension,
                comprehensionRespecte: comprehensionRespecte,
                comprehensionCommentaire: comprehensionCommentaire,
                participationRespecte: participationRespecte,
                assiduite: assiduite,
                vieGroupe: vieGroupe,
                module: module,
                animateurId: animateurId,
                typeseance: typeseance,
                commentaireLibre: commentaireLibre
            },
        }).then(() => {
            return (
                document.querySelector('.formCompte').reset(),
                alert("Création réussie !!!")
            )
        })
    }
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;

    return (
        <form className="col s12 formCompte" onSubmit={onSubmit} >
            <div className="row">
                <div className="row">
                    <div className="input-field col s4">
                        <select id="selectModule" className="browser-default" onChange={e => { module = e.target.value }} required>
                            <option value="disabled selected">Module / Animateur / Formation</option>
                            <SelectModule />
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <select id="animateurId" className="browser-default" onChange={e => { animateurId = e.target.value }} required>
                            <option value="disabled selected">Animateur</option>
                            <SelectAnimateur />
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <select className="browser-default" onChange={e => { typeseance = e.target.value }} required>
                            <option value="disabled selected">Choisir un type de seance</option>
                            <SelectTypeSeance />
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <input id="date" type="date" className="validate" onChange={e => { date = e.target.value }} />
                        <label htmlFor="date">Date de la seance</label>
                    </div>
                    <div className="input-field col s4">
                        <input id="duree" type="text" placeholder="Durée de la seance" className="validate" onChange={e => { duree = e.target.value }} />
                        <label htmlFor="duree"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <textarea id="contenu" type="text" placeholder="Contenu de la seance"
                            className="validate" onChange={e => { contenu = e.target.value }} />
                        <label htmlFor="contenu"></label>
                    </div>
                    <div className="input-field col s4 selectReponse">
                        <select className="browser-default" onChange={e => { contenuRespecte = e.target.value }} required>
                            <option value="disabled selected">Contenu respecté ?</option>
                            <option value="OUI">OUI</option>
                            <option value="NON">NON</option>
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <textarea id="contenuCommentaire" placeholder="Commentaire"
                            className="validate" onChange={e => { contenuCommentaire = e.target.value }} />
                        <label htmlFor="contenuCommentaire"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <textarea id="timing" type="text" placeholder="Horaires"
                            className="validate" onChange={e => { timing = e.target.value }} />
                        <label htmlFor="timing"></label>
                    </div>
                    <div className="input-field col s4 selectReponse">
                        <select className="browser-default" onChange={e => { timingRespecte = e.target.value }} required>
                            <option value="disabled selected">Timing respecté ?</option>
                            <option value="OUI">OUI</option>
                            <option value="NON">NON</option>
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <textarea id="timingCommentaire" placeholder="Commentaire"
                            className="validate" onChange={e => { timingCommentaire = e.target.value }} />
                        <label htmlFor="timingCommentaire"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <textarea id="condition" type="text" placeholder="Conditions"
                            className="validate" onChange={e => { condition = e.target.value }} />
                        <label htmlFor="condition"></label>
                    </div>
                    <div className="input-field col s4 selectReponse">
                        <select className="browser-default" onChange={e => { conditionRespecte = e.target.value }} required>
                            <option value="disabled selected">Conditions respectées ?</option>
                            <option value="OUI">OUI</option>
                            <option value="NON">NON</option>
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <textarea id="conditionCommentaire" placeholder="Commentaire"
                            className="validate" onChange={e => { conditionCommentaire = e.target.value }} />
                        <label htmlFor="conditionCommentaire"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <textarea id="evaluation" type="text" placeholder="Evaluations"
                            className="validate" onChange={e => { evaluation = e.target.value }} />
                        <label htmlFor="evaluation"></label>
                    </div>
                    <div className="input-field col s4 selectReponse">
                        <select className="browser-default" onChange={e => { evaluationRespecte = e.target.value }} required>
                            <option value="disabled selected">Evaluations respectées ?</option>
                            <option value="OUI">OUI</option>
                            <option value="NON">NON</option>
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <textarea id="evaluationCommentaire" placeholder="Commentaire"
                            className="validate" onChange={e => { evaluationCommentaire = e.target.value }} />
                        <label htmlFor="evaluationCommentaire"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <textarea id="comprehension" type="text" placeholder="Compréhensions"
                            className="validate" onChange={e => { comprehension = e.target.value }} />
                        <label htmlFor="comprehension"></label>
                    </div>
                    <div className="input-field col s4 selectReponse">
                        <select className="browser-default" onChange={e => { comprehensionRespecte = e.target.value }} required>
                            <option value="disabled selected">Compréhensions respectées ?</option>
                            <option value="OUI">OUI</option>
                            <option value="NON">NON</option>
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <textarea id="comprehensionCommentaire" placeholder="Commentaire"
                            className="validate" onChange={e => { comprehensionCommentaire = e.target.value }} />
                        <label htmlFor="comprehensionCommentaire"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <textarea id="assiduite" type="text" placeholder="Assiduité"
                            className="validate" onChange={e => { assiduite = e.target.value }} />
                        <label htmlFor="assiduite"></label>
                    </div>
                    <div className="input-field col s4 selectReponse">
                        <select className="browser-default" onChange={e => { participationRespecte = e.target.value }} required>
                            <option value="disabled selected">Participation respectée ?</option>
                            <option value="OUI">OUI</option>
                            <option value="NON">NON</option>
                        </select>
                    </div>
                    <div className="input-field col s4">
                        <textarea id="vieGroupe" placeholder="Vie de groupe..Commentaire"
                            className="validate" onChange={e => { vieGroupe = e.target.value }} />
                        <label htmlFor="vieGroupe"></label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="commentaireLibre" type="text" placeholder="Commentaire Libre"
                            className="validate" onChange={e => { commentaireLibre = e.target.value }} />
                        <label htmlFor="commentaireLibre"></label>
                    </div>
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit">Envoyer </button>
        </form>
    )
}

export const SeanceCreation = () => {
    return (
        <div className="creationCompte">
            <h1 >Création de la seance</h1>
            <div className="row">
                <Formulaire />
            </div>
        </div>
    )
}

