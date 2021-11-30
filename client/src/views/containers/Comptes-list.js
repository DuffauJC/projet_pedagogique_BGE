import React from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getComptes, deleteCompte } from '../../graphql/query'
import { Link } from 'react-router-dom'




const Card = () => {
    const { loading, error, data } = useQuery(getComptes);
    const [deletecompte] = useMutation(deleteCompte)
    if (loading) return <p>Loading ...</p>;
    if (error) return `Error! ${error}`;
    console.log(data);

    if (!data.loading) {
        return data.comptes.map((compte) => {

            // variables 
            const onDeleteCompte = () => {
                deletecompte({
                    variables: {
                        id: compte.id
                    }

                }).then(() => {
                    alert("Compte supprimé !!!")
                })
            }
            return (
                <div className="col s3 m7 " key={compte.id}>
                    <div className="card horizontal compteList-item">
                        <div className="card-image">
                            <img src={compte.avatarId && !compte.avatarId.null ? compte.avatarId : "/assets/avatar/user.png"} alt="" />
                        </div>
                        <div className="card-stacked ">
                            <div className="card-content compteList-color">
                                <p>{compte.nom}</p>
                                <p>{compte.prenom} </p>
                                <p>{compte.role} </p>
                            </div>
                            <div className="card-action compteListe-link">
                                <a>
                                    <i className="primary-content material-icons compteListe-link-delete" onClick={() => { onDeleteCompte(compte.id) }}>Delete</i>
                                </a>
                                <Link to={`/compte/${compte.id}`} >
                                    <i className="secondary-content material-icons compteListe-link-detail">Détail</i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    } else {
        return "Chargement des données...";
    }
}

export const Compteslist = () => {

    return (
        <div>
            <h1 >Liste des comptes</h1>
            <div className="compteListewrapper">
                <Card />
            </div>
        </div>
    )
}
