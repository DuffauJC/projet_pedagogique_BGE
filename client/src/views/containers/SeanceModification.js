import React from 'react'
import { getModules, getComptes, getTypeSeance, getSeanceDetail, updateSeance } from '../../graphql/query'
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
                    Type de seance : {typeseance.libelleCourt} -- {typeseance.libelle} </option>
            )
        })

    } else {
        return "Chargement des données...";
    }
}


export const SeanceModification = (id) => {

    let identifiant = id.match.params.id
    const { loading, error, data } = useQuery(getSeanceDetail, { variables: { id: identifiant } })
    const [updateseance] = useMutation(updateSeance);




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
        updateseance({
            variables: {
                id: data.seance.id,
                date: date,
                duree: duree.value,
                contenu: contenu.value,
                contenuRespecte: contenuRespecte.value,
                contenuCommentaire: contenuCommentaire.value,
                timing: timing.value,
                timingRespecte: timingRespecte.value,
                timingCommentaire: timingCommentaire.value,
                condition: condition.value,
                conditionRespecte: conditionRespecte.value,
                conditionCommentaire: conditionCommentaire.value,
                evaluation: evaluation.value,
                evaluationRespecte: evaluationRespecte.value,
                evaluationCommentaire: evaluationCommentaire.value,
                comprehension: comprehension.value,
                comprehensionRespecte: comprehensionRespecte.value,
                comprehensionCommentaire: comprehensionCommentaire.value,
                participationRespecte: participationRespecte.value,
                assiduite: assiduite.value,
                vieGroupe: vieGroupe.value,
                module: module.value,
                animateurId: animateurId.value,
                typeseance: typeseance.value,
                commentaireLibre: commentaireLibre.value
            },
        }).then(() => {
            return (
                document.querySelector('.formCompte').reset(),
                alert("Modification réussie !!!")
            )
        })
    }

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data)

    return (
        <div className="creationCompte">
            <h1 >Modification de la seance</h1>
            <div className="row">
                <form className="col s12 formCompte" onSubmit={onSubmit} >
                    <div className="row">
                        <div className="modifFormation">
                            <p>DONNEES A RESAISIR</p>
                            <div className="row">
                                <div className="input-field col s4">
                                    <select className="browser-default" ref={(ref) => module = ref} required>
                                        <option value="disabled selected">Module / Animateur / Formation</option>
                                        <SelectModule />
                                    </select>
                                </div>
                                <div className="input-field col s4">
                                    <select id="animateurId" className="browser-default" ref={(ref) => animateurId = ref} required>
                                        <option value="disabled selected">Animateur</option>
                                        <SelectAnimateur />
                                    </select>
                                </div>
                                <div className="input-field col s4">
                                    <select className="browser-default" ref={(ref) => typeseance = ref} required>
                                        <option value="disabled selected">Choisir un type de seance</option>
                                        <SelectTypeSeance />
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input value={data.seance.date} defaultValue="selected" id="date" type="date" className="validate" ref={(ref) => date = ref} required />
                                <label htmlFor="date">Date de la seance</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <input defaultValue={data.seance.duree} id="duree" type="text" className="validate" ref={(ref) => duree = ref} />
                                <label htmlFor="duree"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.contenu} id="contenu" type="text" placeholder="Contenu de la seance"
                                    className="validate" ref={(ref) => contenu = ref} />
                                <label htmlFor="contenu"></label>
                            </div>
                            <div className="input-field col s4 selectReponse">
                                <select className="browser-default" ref={(ref) => contenuRespecte = ref} required>
                                    <option value="disabled selected">Contenu respecté ?</option>
                                    <option value="OUI">OUI</option>
                                    <option value="NON">NON</option>
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.contenuCommentaire} id="contenuCommentaire" placeholder="Commentaire"
                                    className="validate" ref={(ref) => contenuCommentaire = ref} />
                                <label htmlFor="contenuCommentaire"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.timing} id="timing" type="text" placeholder="Horaires"
                                    className="validate" ref={(ref) => timing = ref} />
                                <label htmlFor="timing"></label>
                            </div>
                            <div className="input-field col s4 selectReponse">
                                <select className="browser-default" ref={(ref) => timingRespecte = ref} required>
                                    <option value="disabled selected">Timing respecté ?</option>
                                    <option value="OUI">OUI</option>
                                    <option value="NON">NON</option>
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.timingCommentaire} id="timingCommentaire" placeholder="Commentaire"
                                    className="validate" ref={(ref) => timingCommentaire = ref} />
                                <label htmlFor="timingCommentaire"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.condition} id="condition" type="text" placeholder="Conditions"
                                    className="validate" ref={(ref) => condition = ref} />
                                <label htmlFor="condition"></label>
                            </div>
                            <div className="input-field col s4 selectReponse">
                                <select className="browser-default" ref={(ref) => conditionRespecte = ref} required>
                                    <option value="disabled selected">Condition respecté ?</option>
                                    <option value="OUI">OUI</option>
                                    <option value="NON">NON</option>
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.conditionCommentaire} id="conditionCommentaire" placeholder="Commentaire"
                                    className="validate" ref={(ref) => conditionCommentaire = ref} />
                                <label htmlFor="conditionCommentaire"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.evaluation} id="evaluation" type="text" placeholder="Evaluations"
                                    className="validate" ref={(ref) => evaluation = ref} />
                                <label htmlFor="evaluation"></label>
                            </div>
                            <div className="input-field col s4 selectReponse">
                                <select className="browser-default" ref={(ref) => evaluationRespecte = ref} required>
                                    <option value="disabled selected">Evaluations respectées ?</option>
                                    <option value="OUI">OUI</option>
                                    <option value="NON">NON</option>
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.evaluationCommentaire} id="evaluationCommentaire" placeholder="Commentaire"
                                    className="validate" ref={(ref) => evaluationCommentaire = ref} />
                                <label htmlFor="evaluationCommentaire"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.comprehension} id="comprehension" type="text" placeholder="Compréhensions"
                                    className="validate" ref={(ref) => comprehension = ref} />
                                <label htmlFor="comprehension"></label>
                            </div>
                            <div className="input-field col s4 selectReponse">
                                <select className="browser-default" ref={(ref) => comprehensionRespecte = ref} required>
                                    <option value="disabled selected">Compréhension respectée ?</option>
                                    <option value="OUI">OUI</option>
                                    <option value="NON">NON</option>
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.comprehensionCommentaire} id="comprehensionCommentaire" placeholder="Commentaire"
                                    className="validate" ref={(ref) => comprehensionCommentaire = ref} />
                                <label htmlFor="comprehensionCommentaire"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.assiduite} id="assiduite" type="text" placeholder="Assiduité"
                                    className="validate" ref={(ref) => assiduite = ref} />
                                <label htmlFor="assiduite"></label>
                            </div>
                            <div className="input-field col s4 selectReponse">
                                <select className="browser-default" ref={(ref) => participationRespecte = ref} required>
                                    <option value="disabled selected">Participation respectée ?</option>
                                    <option value="OUI">OUI</option>
                                    <option value="NON">NON</option>
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <textarea defaultValue={data.seance.vieGroupe} id="vieGroupe" placeholder="Vie de groupe..Commentaire"
                                    className="validate" ref={(ref) => vieGroupe = ref} />
                                <label htmlFor="vieGroupe"></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea defaultValue={data.seance.commentaireLibre} id="commentaireLibre" type="text" placeholder="Commentaire Libre"
                                    className="validate" ref={(ref) => commentaireLibre = ref} />
                                <label htmlFor="commentaireLibre"></label>
                            </div>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Envoyer </button>
                </form>
            </div>
        </div>
    )
}

