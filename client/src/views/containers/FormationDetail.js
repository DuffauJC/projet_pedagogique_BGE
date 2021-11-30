import React from 'react'
import { useQuery } from '@apollo/client';
import { getFormationDetail } from '../../graphql/query'
import { Link } from 'react-router-dom'


export const FormationDetail = (id) => {
    let identifiant = id.match.params.id

    const { loading, error, data } = useQuery(getFormationDetail, { variables: { id: identifiant } })
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data)


    // recup data stagiaires
    const dataStagiaire = data.formation.stagiaires

    // recup data aniamteurs
    const dataAnimateur = data.formation.modules

    // recup data modules
    const dataModules = data.formation.modules
console.log(dataAnimateur)

    return (
        <div >
            <h1 >Détails de la formation</h1>
            <div className="retourComptes">
                <ul className="lienDetail">
                    <li>
                        <Link to={`/formationModification/${data.formation.id}`} className="waves-effect waves-light btn modification">Modifier la formation</Link>
                    </li>
                    <li>
                        <Link to="/formations" className="waves-effect waves-light btn retourListe">Retour à la liste des formations</Link>
                    </li>
                </ul>
            </div>

            <div className="detail">

                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Référence</span>
                            <p>{data.formation.reference}</p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Libelle</span>
                            <p>{data.formation.libelle}</p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Date de début</span>
                            <p>{data.formation.dateDebut}</p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Date de fin</span>
                            <p>{data.formation.dateFin}</p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Lieu de formation</span>
                            <p>{data.formation.adressesformation.libelle1} </p>
                            <p>{data.formation.adressesformation.libelle2} </p>
                            <p>{data.formation.adressesformation.codePostal}</p>
                            <p>{data.formation.adressesformation.ville}</p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Mode de formation</span>
                            <p>{data.formation.formationmodes.libelle} </p>
                            <p>Description : {data.formation.formationmodes.description} </p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail">
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Responsable de la formation</span>
                            <p>{data.formation.responsable.nom} </p>
                            <p>{data.formation.responsable.prenom} </p>
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail" >
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Stagiaires de la formation</span>
                            {dataStagiaire.map((stagiaire,index) => {
                                return (
                                    <div key={index}><br />
                                        <p>Nom : {stagiaire.compte.nom}</p>
                                        <p>Prénom : {stagiaire.compte.prenom}</p><br />
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail" >
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Animateurs de la formation</span>
                            {dataAnimateur.map((animateur,index) => {
                                return (
                                    <div key={index}><br />
                                        <p>Nom : {animateur.animateurId.nom}</p>
                                        <p>Prénom : {animateur.animateurId.prenom}</p><br />
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className=" card comptedetail" >
                    <div className="blue-grey darken-1">
                        <div className="card-content white-text ">
                            <span className="card-title">Modules de la formation</span>
                            {dataModules.map((module,index) => {
                                return (
                                    <div key={index}><br />
                                        <p>Réference : {module.reference}</p>
                                        <p>Libelle : {module.libelle}</p>
                                        <p>Description : {module.description}</p><br />
                                        <hr />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
