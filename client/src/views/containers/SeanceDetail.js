import React from 'react'
import { useQuery } from '@apollo/client';
import { getSeanceDetail } from '../../graphql/query'
import { Link } from 'react-router-dom'


export const SeanceDetail = (id) => {
    let identifiant = id.match.params.id

    const { loading, error, data } = useQuery(getSeanceDetail, { variables: { id: identifiant } })
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data)



    // Data module
    const module = data.seance.module

    return (
        <div >
            <h1 >Détails de la seance</h1>
            <div className="retourComptes">
                <ul className="lienDetail">
                    <li>
                        <Link to={`/seanceModification/${data.seance.id}`} className="waves-effect waves-light btn modification">Modifier la seance</Link>
                    </li>
                    <li>
                        <Link to="/seances" className="waves-effect waves-light btn retourListe">Retour à la liste des seances</Link>
                    </li>
                    <li>
                        <Link to={`/seancePdf/${data.seance.id}`} className="waves-effect waves-light btn lienPdf">Version PDF</Link>
                    </li>
                </ul>
            </div>

            <div className="detail">

                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Seance du module</span>
                            <h3>{module.libelle}</h3>
                            <p>Réference : {module.reference}</p><br />
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Seance de la formation</span>
                            <h3>{module.formation.libelle}</h3>
                            <p>Réference : {module.formation.reference}</p><br />
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Animateur</span>
                            <h3>Nom : {module.animateurId.nom}</h3>
                            <p>Prénom : {module.animateurId.prenom}</p><br />
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Infos</span>
                            <p>Durée : {data.seance.duree}</p>
                            <p>Date : {data.seance.date}</p>
                            <p>Type de seance : {data.seance.typeseance.libelle}</p>
                            <p>Description : {data.seance.typeseance.description}</p>

                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Contenu de la seance</span>
                            <p>Contenu : {data.seance.contenu}</p>
                            <p>Contenu respecté : {data.seance.contenuRespecte}</p>
                            <p>Commentaire : {data.seance.contenuCommentaire}</p>
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Timming</span>
                            <p>Horaires : {data.seance.timing}</p>
                            <p>Horaires respecté : {data.seance.timingRespecte}</p>
                            <p>Commentaire : {data.seance.timingCommentaire}</p>
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Condition</span>
                            <p>Condition : {data.seance.condition}</p>
                            <p>Condition respecté : {data.seance.conditionRespecte}</p>
                            <p>Commentaire : {data.seance.conditionCommentaire}</p>
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Evaluation</span>
                            <p>Evaluation : {data.seance.evaluation}</p>
                            <p>Evaluation respecté : {data.seance.evaluationRespecte}</p>
                            <p>Commentaire : {data.seance.evaluationCommentaire}</p>
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Compréhension</span>
                            <p>Compréhension : {data.seance.comprehension}</p>
                            <p>Compréhension respecté : {data.seance.evaluationRespecte}</p>
                            <p>Commentaire : {data.seance.evaluationCommentaire}</p>
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Participation</span>
                            <p>Participation respectée: {data.seance.participationRespecte}</p>
                            <p>Assiduité : {data.seance.assiduite}</p>
                            <p>Vie de groupe : {data.seance.vieGroupe}</p>
                        </div>
                    </div>
                </div>
                <div className=" card seancedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Commentaire Libre</span>
                            <p>Commentaire : {data.seance.commentaireLibre}</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
