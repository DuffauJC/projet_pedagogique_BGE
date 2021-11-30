import React from 'react'
import {
    getComptes,
    getAdressesFormation,
    getFormationModes,
    getFormationDetail,
    UpdateFormation
} from '../../graphql/query'
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';



const SelectResponsable = () => {
    const { loading, error, data } = useQuery(getComptes);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.comptes.map((compte) => {
            if (compte.role === "ANIMATEUR")
                return (
                    <option key={compte.id} value={compte.id}> {compte.nom} {compte.prenom}</option>
                )
        })

    } else {
        return "Chargement des données...";
    }
}

const SelectAdresse = () => {
    const { loading, error, data } = useQuery(getAdressesFormation);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.adressesformations.map((adresse) => {
            return (
                <option key={adresse.id} value={adresse.id}>{adresse.codePostal} {adresse.ville}</option>
            )
        })

    } else {
        return "Chargement des données...";
    }
}

const SelectFormationMode = () => {
    const { loading, error, data } = useQuery(getFormationModes);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.formationmodes.map((mode) => {
            return (
                <option key={mode.id} value={mode.id}>{mode.libelle}</option>
            )
        })

    } else {
        return "Chargement des données...";
    }
}

export const FormationModification = (id) => {

    let identifiant = id.match.params.id
    const { loading, error, data } = useQuery(getFormationDetail, { variables: { id: identifiant } })
    const [updateformation] = useMutation(UpdateFormation);

    ///// Identifiants des imputs pour passer dans variables 
    let reference
    let libelle
    let dateDebut
    let dateFin
    let participants
    let adressesformation
    let formationmodes
    let responsable

    // Validation du formulaire
    const onSubmit = (event) => {
        event.preventDefault();
        updateformation({
            variables: {
                id: data.formation.id,
                reference: reference.value,
                libelle: libelle.value,
                dateDebut: dateDebut.value,
                dateFin: dateFin.value,
                participants: participants.value,
                adressesformation: adressesformation,
                formationmodes: formationmodes,
                responsable: responsable
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
            <h1 >Modification de la formation</h1>
            <div className="retourComptes">
                <ul className="lienDetail">
                    <li>
                        <Link to={`/formation/${data.formation.id}`} className="waves-effect waves-light btn modification">Détail de la formation</Link>
                    </li>
                    <li>
                        <Link to="/formations" className="waves-effect waves-light btn retourListe">Retour à la liste des formations</Link>
                    </li>
                </ul>
            </div>
            <div className="row">
                <form className="col s12 formCompte" onSubmit={onSubmit} >
                    <div className="row">
                        <div className="input-field col s4">
                            <input defaultValue={data.formation.reference} id="reference" type="text" placeholder="Réference" className="validate" ref={(ref) => reference = ref} />
                            <label htmlFor="reference"></label>
                            <span className="helper-text">Référence</span>
                        </div>
                        <div className="input-field col s4">
                            <input defaultValue={data.formation.libelle} id="libelle" type="text" placeholder="Libelle" className="validate" ref={(ref) => libelle = ref} />
                            <label htmlFor="libelle"></label>
                            <span className="helper-text">Libelle</span>
                        </div>
                        <div className="input-field col s4">
                            <input defaultValue={data.formation.participants} id="participants" type="text" placeholder="Nombre de participants" className="validate" ref={(ref) => participants = ref} />
                            <label htmlFor="participants"></label>
                            <span className="helper-text">Nombre de participants</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s4">
                            <input value={data.formation.dateDebut} defaultValue="selected" id="dateDebut" type="date" className="validate" ref={(ref) => dateDebut = ref} required />
                            <label htmlFor="dateDebut"></label>
                            <span className="helper-text">Date de début de formation</span>
                        </div>
                        <div className="input-field col s4">
                            <input value={data.formation.dateFin} defaultValue="selected" id="dateFin" type="date" className="validate" ref={(ref) => dateFin = ref} required />
                            <label htmlFor="dateFin"></label>
                            <span className="helper-text">Date de fin de formation</span>
                        </div>
                    </div>
                    <div className="modifFormation">
                        <p>DONNEES A RESAISIR</p>
                        <div className="row">
                            <div className="input-field col s4">
                                <select className="browser-default" onChange={e => { formationmodes = e.target.value }} required>
                                    <option defaultValue="selected" value="">Choisir un mode de formation</option>
                                    <SelectFormationMode />
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <select className="browser-default" onChange={e => { adressesformation = e.target.value }} required>
                                    <option defaultValue="selected" value="">Choisir un lieu de formation</option>
                                    <SelectAdresse />
                                </select>
                            </div>
                            <div className="input-field col s4">
                                <select className="browser-default" onChange={e => { responsable = e.target.value }} required>
                                    <option defaultValue="selected" value="">Choisir un reponsable</option>
                                    <SelectResponsable />
                                </select>
                            </div>
                        </div>
                    </div>

                    <button className="btn waves-effect waves-light" type="submit">Envoyer </button>
                </form>
            </div>
        </div>
    )
}

