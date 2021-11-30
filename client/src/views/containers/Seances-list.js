import React from 'react'
import { useQuery } from '@apollo/client';
import { getSeances } from '../../graphql/query'
import { Link } from 'react-router-dom'


const Card = () => {
    const { loading, error, data } = useQuery(getSeances);

    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data);



    if (!data.loading) {
        return data.seances.map((seance) => {

            const date = seance.date


            return (
                <div className="col s12 m6" key={seance.id}>
                    <div className="card formationList-item">
                        <div className="card-content formationList-color">
                            <h2>{seance.contenu}</h2>
                            <p>Durée : {seance.duree} </p>
                            <p>Date : {date}</p><br />
                            <hr /><br />
                            <span>Du module : {seance.module.reference} </span>
                            <p>Libelle : {seance.module.libelle}</p>
                            <p>Description : {seance.module.description}</p><br />
                            <hr /><br />
                            <span>De la formation : {seance.module.formation.reference} </span>
                            <p>Libelle : {seance.module.formation.libelle}</p>
                            <p>Date de début : {seance.module.formation.dateDebut}</p>
                            <p>Date de fin : {seance.module.formation.dateFin}</p><br />
                            <hr /><br />
                            <span>Animateur :</span>
                            <p>{seance.module.animateurId.nom} {seance.module.animateurId.prenom}</p>
                        </div>
                        <div className="card-action formationList-link">
                            <Link to={`/seance/${seance.id}`} >
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

export const Seanceslist = () => {
    return (
        <div>
            <h1 >Liste des seances</h1>
            <div className="formationListewrapper">
                <Card />
            </div>
        </div>
    )
}
