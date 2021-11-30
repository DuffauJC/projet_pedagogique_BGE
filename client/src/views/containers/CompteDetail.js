import React from 'react'
import { useQuery } from '@apollo/client';
import { getCompteDetail } from '../../graphql/query'
import { Link } from 'react-router-dom'



export default function Comptedetail(id) {
    let identifiant = id.match.params.id

    const { loading, error, data } = useQuery(getCompteDetail, { variables: { id: identifiant } })
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data)
    // conversion des champs dates_role
    const dateDebut = data.compte.dates_role;


    // recup data stagiaires
    const dataStagiaire = data.compte.stagiaire

    // recup data animateurs
    const dataAnimateur = data.compte.modules

    // switch case
    const expression = data.compte.role

    switch (expression) {
        case "STAGIAIRE":
            return (
                <div >
                    <h1 >Détails du compte</h1>
                    <div className="retourComptes">
                        <ul className="lienDetail">
                            <li>
                                <Link to={`/compteModification/${data.compte.id}`} className="waves-effect waves-light btn modification">Modifier le compte</Link>
                            </li>
                            <li>
                                <Link to="/comptes" className="waves-effect waves-light btn retourListe">Retour à la liste des comptes</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="detail">
                        <div className="imagecomptedetail">
                            <img src={data.compte.avatarId && !data.compte.avatarId.null ? data.compte.avatarId : "/assets/avatar/user.png"}
                                alt="" className="vignette_profil" />
                        </div>

                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Nom</span>
                                    <p>{data.compte.nom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Prénom</span>
                                    <p>{data.compte.prenom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Email</span>
                                    <p> {data.compte.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Téléphone</span>
                                    <p> {data.compte.telephone}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Adresse</span>
                                    <p>{data.compte.adresse.libelle1} </p>
                                    <p>{data.compte.adresse.libelle2} </p>
                                    <p>{data.compte.adresse.codePostal}</p>
                                    <p>{data.compte.adresse.ville}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Statut</span>
                                    <p>{data.compte.role} </p>
                                    <p>Description : {data.compte.role_def.description} </p>
                                    <textarea id="credentials" name="credentials"
                                        readOnly value={data.compte.role_def.credentials}>Crédentials : </textarea>
                                </div>
                            </div>
                        </div>
                        {dataStagiaire.map((element, index) => {
                            return (
                                <div className=" card col s12 m6 comptedetail" key={index}>
                                    <div className="blue-grey darken-1">
                                        <div className="card-content white-text ">
                                            <span className="card-title">Stagiaire de la formation</span>
                                            <p>Réference : {element.formation.reference}</p>
                                            <p>Formation : {element.formation.libelle}</p>
                                            <p>Date début :{element.formation.dateDebut}  </p>
                                            <p>Date fin :{element.formation.dateFin}  </p>
                                            <hr />
                                            <p>Date inscription :{element.dateInscription}  </p>
                                            <p>Date démarrage : {element.dateDemarrage} </p>
                                            <p>Date fin :{element.dateFin}  </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        case "ANIMATEUR":
            return (
                <div >
                    <h1 >Détails du compte</h1>
                    <div className="retourComptes">
                        <ul className="lienDetail">
                            <li>
                                <Link to={`/compteModification/${data.compte.id}`} className="waves-effect waves-light btn modification">Modifier le compte</Link>
                            </li>
                            <li>
                                <Link to="/comptes" className="waves-effect waves-light btn retourListe">Retour à la liste des comptes</Link>
                            </li>
                        </ul>

                    </div>
                    <div className="detail">
                        <div className="imagecomptedetail">
                            <img src={data.compte.avatarId && !data.compte.avatarId.null ? data.compte.avatarId : "/assets/avatar/user.png"}
                                alt="" className="vignette_profil" />
                        </div>


                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Nom</span>
                                    <p>{data.compte.nom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Prénom</span>
                                    <p>{data.compte.prenom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Email</span>
                                    <p> {data.compte.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Téléphone</span>
                                    <p> {data.compte.telephone}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Adresse</span>
                                    <p>{data.compte.adresse.libelle1} </p>
                                    <p>{data.compte.adresse.libelle2} </p>
                                    <p>{data.compte.adresse.codePostal}</p>
                                    <p>{data.compte.adresse.ville}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Statut</span>
                                    <p>{data.compte.role} </p>
                                    <p>Description : {data.compte.role_def.description} </p>
                                    <textarea id="credentials" name="credentials"
                                        readOnly value={data.compte.role_def.credentials}>Crédentials : </textarea>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">{data.compte.role} depuis :</span>
                                    <p>{dateDebut}</p>
                                </div>
                            </div>
                        </div>
                        {dataAnimateur.map((element, index) => {
                            return (
                                <div className=" card col s12 m6 comptedetail" key={index}>
                                    <div className="blue-grey darken-1">
                                        <div className="card-content white-text ">
                                            <span className="card-title">Animateur du module</span>
                                            <p>Réference : {element.reference}</p>
                                            <p>Libelle : {element.libelle}</p>
                                            <p>Description :{element.description}  </p><br />
                                            <hr /><br />
                                            <span className="card-title">De la formation</span>
                                            <p>Réference : {element.formation.reference}</p>
                                            <p>Formation : {element.formation.libelle}</p>
                                            <p>Date début :{element.formation.dateDebut}  </p>
                                            <p>Date fin :{element.formation.dateFin}  </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );

        case "ADMIN":
            return (
                <div >
                    <h1 >Détails du compte</h1>
                    <div className="retourComptes">
                        <ul className="lienDetail">
                            <li>
                                <Link to={`/compteModification/${data.compte.id}`} className="waves-effect waves-light btn modification">Modifier le compte</Link>
                            </li>
                            <li>
                                <Link to="/comptes" className="waves-effect waves-light btn retourListe">Retour à la liste des comptes</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="detail">
                        <div className="imagecomptedetail">
                            <img src={data.compte.avatarId && !data.compte.avatarId.null ? data.compte.avatarId : "/assets/avatar/user.png"}
                                alt="" className="vignette_profil" />
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Nom</span>
                                    <p>{data.compte.nom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Prénom</span>
                                    <p>{data.compte.prenom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Email</span>
                                    <p> {data.compte.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Téléphone</span>
                                    <p> {data.compte.telephone}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Adresse</span>
                                    <p>{data.compte.adresse.libelle1} </p>
                                    <p>{data.compte.adresse.libelle2} </p>
                                    <p>{data.compte.adresse.codePostal}</p>
                                    <p>{data.compte.adresse.ville}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Statut</span>
                                    <p>{data.compte.role} </p>
                                    <p>Description : {data.compte.role_def.description} </p>
                                    <textarea id="credentials" name="credentials"
                                        readOnly value={data.compte.role_def.credentials}>Crédentials : </textarea>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">{data.compte.role} depuis :</span>
                                    <p>{dateDebut}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            // aucun role (statut) affichage coordonnées
            return (
                <div >
                    <h1 >Détails du compte</h1>
                    <div className="retourComptes">
                        <ul className="lienDetail">
                            <li>
                                <Link to={`/compteModification/${data.compte.id}`} className="waves-effect waves-light btn modification">Modifier le compte</Link>
                            </li>
                            <li>
                                <Link to="/comptes" className="waves-effect waves-light btn retourListe">Retour à la liste des comptes</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="detail">
                        <div className="imagecomptedetail">
                            <img src={data.compte.avatarId && !data.compte.avatarId.null ? data.compte.avatarId : "/assets/avatar/user.png"}
                                alt="" className="vignette_profil" />
                        </div>


                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Nom</span>
                                    <p>{data.compte.nom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Prénom</span>
                                    <p>{data.compte.prenom}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Email</span>
                                    <p> {data.compte.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Téléphone</span>
                                    <p> {data.compte.telephone}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" card col s12 m6 comptedetail">
                            <div className="blue-grey darken-1">
                                <div className="card-content white-text ">
                                    <span className="card-title">Adresse</span>
                                    <p>{data.compte.adresse.libelle1} </p>
                                    <p>{data.compte.adresse.libelle2} </p>
                                    <p>{data.compte.adresse.codePostal}</p>
                                    <p>{data.compte.adresse.ville}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

}
