import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getFormations,deleteFormation } from '../../graphql/query'
import { Link } from 'react-router-dom'


const Card = () => {
    const { loading, error, data } = useQuery(getFormations);
    const [deleteformation] = useMutation(deleteFormation)
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data);



    if (!data.loading) {
        return data.formations.map((formation) => {

            const dateDebut = formation.dateDebut
            const dateFin = formation.dateFin
            
            // Suppression 
            const onDeleteFormation = () => {
                deleteformation({
                    variables: {
                        id: formation.id
                    }

                }).then(() => {
                    alert("formation supprimé !!!")
                })
            }
            return (
                <div className="col s12 m6" key={formation.id}>
                    <div className="card formationList-item">
                        <div className="card-content formationList-color">
                            <h4>{formation.libelle} </h4>
                            <p>{formation.reference}</p>
                            <p> {dateDebut}</p>
                            <p>{dateFin}</p>
                            <span>{formation.adressesformation.ville}</span>
                        </div>
                        <div className="card-action formationList-link">
                            <a>
                                <i className="primary-content material-icons formationList-link-delete" onClick={() => { onDeleteFormation(formation.id) }}>Delete</i>
                            </a>
                            <Link to={`/formation/${formation.id}`} >
                                <i className="secondary-content material-icons formationList-link-detail">Détail</i>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })
    } else {
        return "Chargement des données...";
    }
}

export const Formationslist = () => {
    return (
        <div>
            <h1 >Liste des formations</h1>
            <div className="formationListewrapper">
                <Card />
            </div>
        </div>
    )
}
