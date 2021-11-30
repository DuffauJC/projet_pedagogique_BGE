import React from 'react'
import { postCompte } from '../../graphql/query'
import { useMutation } from '@apollo/client';


const Formulaire = () => {
    const [postcompte] = useMutation(postCompte);
    const AvatarSrc = '/assets/avatar/'

    //Image preview
    const afficherPhoto = event => {
        let img = document.querySelector('.vignette_profil')
        img.src = event.target.value
    }

    ///// Identifiants des imputs pour passer dans variables 
    let nom
    let prenom
    let email
    let telephone
    let motDePasse
    let libelle1
    let libelle2
    let codePostal
    let ville
    let role
    let libelle
    let description
    let credentials
    let dates_role
    let avatarId

    // Validation du formulaire
    const onSubmit = (event) => {
        event.preventDefault();
        postcompte({
            variables: {
                nom: nom,
                prenom: prenom,
                email: email,
                telephone: telephone,
                motDePasse: motDePasse,
                adresse: {
                    libelle1: libelle1,
                    libelle2: libelle2,
                    codePostal: codePostal,
                    ville: ville,
                },
                role:role,
                role_def: {
                    description: description,
                    credentials: credentials
                },
                dates_role: dates_role,
                avatarId: avatarId,
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
                    <input id="nom" type="text" placeholder="Nom" className="validate" onChange={e => { nom = e.target.value }} />
                    <label htmlFor="nom"></label>
                </div>
                <div className="input-field col s4">
                    <input id="prenom" type="text" placeholder="Prénom" className="validate" onChange={e => { prenom = e.target.value }} />
                    <label htmlFor="prenom"></label>
                </div>
                <div className="input-field col s4">
                    <input id="email" type="email" placeholder="Email" className="validate" onChange={e => { email = e.target.value }} />
                    <label htmlFor="email"></label>
                    <span className="helper-text" state-error="wrong" state-success="right">exemple@xxx.com</span>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <input id="telephone" type="text" placeholder="Téléphone" className="validate" onChange={e => { telephone = e.target.value }} />
                    <label htmlFor="telephone"></label>
                </div>
                <div className="input-field col s4">
                    <input id="password" type="password" placeholder="Mot de passe" className="validate" onChange={e => { motDePasse = e.target.value }} />
                    <label htmlFor="password"></label>
                </div>

            </div>
            <div className="row">
                <div className="input-field col s4">
                    <select className="browser-default" onChange={e => { role = e.target.value }} required>
                        <option value="disabled selected">Choisir un Role</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="ANIMATEUR">ANIMATEUR</option>
                        <option value="STAGIAIRE">STAGIAIRE</option>
                    </select>
                </div>
                <div className="input-field col s4">
                    <select className="browser-default" onChange={e => { description = e.target.value }} required>
                        <option value="disabled selected">Description du Role</option>
                        <option value="ADMIN : Administrateur du site">Administrateur du site</option>
                        <option value="ANIMATEUR : Animateur du site">Animateur du site</option>
                        <option value="STAGIAIRE : Personne en formation">Personne en formation</option>
                    </select>
                </div>
                <div className="input-field col s4">
                    <select className="browser-default" onChange={e => { credentials = e.target.value }} required>
                        <option value="disabled selected">Permissions</option>
                        <option value="ADMIN : Tous les pouvoirs">ADMIN : Tous les pouvoirs </option>
                        <option value="ANIMATEUR : Modifie son compte, Création, Modification, Liste ses fiches journalières">ANIMATEUR : Modifie son compte, Création, Modification, Liste ses fiches journalières</option>
                        <option value="STAGIAIRE : Aucun pouvoirs">STAGIAIRE : Aucun pouvoirs</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <input id="dates_role" type="date" className="validate" onChange={e => { dates_role = e.target.value }} />
                    <label htmlFor="dates_role">Date de création du role</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <input id="libelle1" type="text" placeholder="Adresse" className="validate" onChange={e => { libelle1 = e.target.value }} />
                    <label htmlFor="libelle1"></label>
                    <span className="helper-text" state-error="wrong" state-success="right">exemple : 25 rue du platane</span>
                </div>
                <div className="input-field col s4">
                    <input id="libelle2" type="text" placeholder="Complément" className="validate" onChange={e => { libelle2 = e.target.value }} />
                    <label htmlFor="libelle2"></label>
                    <span className="helper-text" state-error="wrong" state-success="right">exemple : appt 12, étage..</span>
                </div>
                <div className="input-field col s4">
                    <input id="codePostal" type="text" placeholder="Code postal" className="validate" onChange={e => { codePostal = e.target.value }} />
                    <label htmlFor="codePostal"></label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <input id="ville" type="text" placeholder="Ville" className="validate" onChange={e => { ville = e.target.value }} />
                    <label htmlFor="ville"></label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s4">
                    <select id="avatarId" name="avatarId" onChange={e => { avatarId = e.target.value; afficherPhoto(e) }} className="browser-default">
                        <option value="disabled selected">Choisir un avatar</option>
                        <option value={AvatarSrc + `man-1.png`}>Man 1</option>
                        <option value={AvatarSrc + `man-2.png`}>Man 2</option>
                        <option value={AvatarSrc + `man-3.png`}>Man 3</option>
                        <option value={AvatarSrc + `man-4.png`}>Man 4</option>
                        <option value={AvatarSrc + `man-5.png`}>Man 5</option>
                        <option value={AvatarSrc + `woman-1.png`}>Woman 1</option>
                        <option value={AvatarSrc + `woman-2.png`}>Woman 2</option>
                        <option value={AvatarSrc + `woman-3.png`}>Woman 3</option>
                        <option value={AvatarSrc + `woman-4.png`}>Woman 4</option>
                    </select>
                </div>
                <div className="col s6 ">
                    <img src="/assets/avatar/user.png" alt="" className='vignette_profil' />
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit">Envoyer </button>
        </form>
    )
}

export const CompteCreation = () => {
    return (
        <div className="creationCompte">
            <h1 >Création du compte</h1>
            <div className="row">
                <Formulaire />
            </div>
        </div>
    )
}
