import React from 'react'
import { getAnimateurs, getAdressesFormation, getFormationModes, postFormation } from '../../graphql/query'
import { useQuery, useMutation } from '@apollo/client';




const SelectResponsable = () => {
    const { loading, error, data } = useQuery(getAnimateurs);
    if (loading) return <>Loading ...</>;
    if (error) return `Error! ${error}`;
    console.log(data);
    if (!data.loading) {
        return data.comptes.map((compte) => {
            if(compte.role==="ANIMATEUR")
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
const Formulaire = () => {
    const [postformation] = useMutation(postFormation);

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
        postformation({
            variables: {
                reference: reference,
                libelle: libelle,
                dateDebut: dateDebut,
                dateFin: dateFin,
                participants: participants,
                adressesformation: adressesformation,
                formationmodes: formationmodes,
                responsable: responsable
            },
        }).then(() => {
            return (
                document.querySelector('.formCompte').reset(),
                alert("Création réussie !!!")
            )
        })
    }

    return (
        <form className="col s12 formCompte" onSubmit={onSubmit} >
            <div className="row">
                <div className="input-field col s4">
                    <input id="reference" type="text" placeholder="Réference" className="validate" onChange={e => { reference = e.target.value }} />
                    <label htmlFor="reference"></label>
                </div>
                <div className="input-field col s4">
                    <input id="libelle" type="text" placeholder="Libelle" className="validate" onChange={e => { libelle = e.target.value }} />
                    <label htmlFor="libelle"></label>
                </div>
                <div className="input-field col s4">
                    <input id="participants" type="text" placeholder="Nombre de participants" className="validate" onChange={e => { participants = e.target.value }} />
                    <label htmlFor="participants"></label>
                </div>
                <div className="row">
                    <div className="input-field col s4">
                        <input  id="dateDebut" type="date" className="validate" onChange={e => { dateDebut = e.target.value }} />
                        <label htmlFor="dateDebut"></label>
                        <span className="helper-text">Date de début de formation</span>
                    </div>
                    <div className="input-field col s4">
                        <input id="dateFin" type="date" className="validate" onChange={e => { dateFin = e.target.value }} />
                        <label htmlFor="dateFin"></label>
                        <span className="helper-text">Date de fin de formation</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <select className="browser-default" onChange={e => { formationmodes = e.target.value }} required>
                        <option value="disabled selected">Choisir un mode de formation</option>
                        <SelectFormationMode />
                    </select>
                </div>
                <div className="input-field col s4">
                    <select className="browser-default" onChange={e => { adressesformation = e.target.value }} required>
                        <option value="disabled selected">Choisir un lieu de formation</option>
                        <SelectAdresse />
                    </select>
                </div>
                <div className="input-field col s4">
                    <select className="browser-default" onChange={e => { responsable = e.target.value }} required>
                        <option value="disabled selected">Choisir un reponsable</option>
                        <SelectResponsable />
                    </select>
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit">Envoyer </button>
        </form>
    )
}

export const FormationCreation = () => {
    return (
        <div className="creationCompte">
            <h1 >Création de la formation</h1>
            <div className="row">
                <Formulaire />
            </div>
        </div>
    )
}

