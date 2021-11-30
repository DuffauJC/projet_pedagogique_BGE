import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getStagiaires, deleteStagiaire } from '../../graphql/query'
import { Link } from 'react-router-dom'

const Card = () => {
    const { loading, error, data } = useQuery(getStagiaires);
    const [deletestagiaire] = useMutation(deleteStagiaire)
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data);



    if (!data.loading) {
        return data.stagiaires.map((stagiaire) => {



            // variables 
            const onDeleteStagiaire = () => {
                deletestagiaire({
                    variables: {
                        id: stagiaire.id
                    }

                }).then(() => {
                    alert("Stagiaire supprimé !!!")
                })
            }
            return (
                <div className="col s12 m6" key={stagiaire.id}>
                    <div className="card formationList-item">
                        <div className="card-content formationList-color">
                            <div className="card-image imagestagiairedetail">
                                <img src={stagiaire.compte.avatarId && !stagiaire.compte.avatarId.null ? stagiaire.compte.avatarId : "/assets/avatar/user.png"} alt="" />
                            </div>
                            <h2>{stagiaire.compte.nom} {stagiaire.compte.prenom}</h2>
                            <p>Email : {stagiaire.compte.email} </p>
                            <p>Date d'inscription : {stagiaire.dateInscription}</p><br />
                            <p>Date de démarrage : {stagiaire.dateDemarrage}</p><br />
                            <p>Date de fin : {stagiaire.dateFin}</p><br />
                            <hr /><br />
                            <span>De la formation : {stagiaire.formation.reference} </span>
                            <p>Libelle : {stagiaire.formation.libelle}</p>
                            <p>Date de début : {stagiaire.formation.dateDebut}</p>
                            <p>Date de fin : {stagiaire.formation.dateFin}</p><br />
                            <hr /><br />
                            <span>Ordinateur :</span>
                            <p>Libelle : {stagiaire.ordinateurs.libelle}</p>
                            <p>Numéro de série : {stagiaire.ordinateurs.numeroserie}</p>
                            <p>Souris : {stagiaire.ordinateurs.souris}</p><br />
                            <p>Date de prêt : {stagiaire.ordinateurPret.datePret}</p><br />
                            <p>Date de restitution : {stagiaire.ordinateurPret.dateRestitution}</p><br />
                            <hr /><br />
                        </div>
                        <div className="card-action formationList-link">
                            <a>
                                <i className="primary-content material-icons compteListe-link-delete" onClick={() => { onDeleteStagiaire(stagiaire.id) }}>Delete</i>
                            </a>
                        </div>
                    </div>
                </div>
            )
        })
    } else {
        return "Chargement des données...";
    }
}

export default function StagiairesList() {

    return (
        <div>
            <h1 >Liste des stagiaires</h1>
            <div className="formationListewrapper">
                <Card />
            </div>
        </div>
    )
}
