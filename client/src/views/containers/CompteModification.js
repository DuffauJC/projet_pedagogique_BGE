import React from 'react'
import { getCompteDetail, modifCompte } from '../../graphql/query'
import { useQuery, useMutation } from '@apollo/client';

import { Link } from 'react-router-dom';



export const CompteModification = (id) => {
    let identifiant = id.match.params.id

    const { loading, error, data } = useQuery(getCompteDetail, { variables: { id: identifiant } })
    const [modifcompte] = useMutation(modifCompte)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    console.log(data)
    const AvatarSrc = '/assets/avatar/'

    ///////////  Formulaire submit ///////
    ///// Identifiants des imputs pour passer dans variables 
    let nom
    let prenom
    let email
    let telephone
    let libelle1
    let libelle2
    let codePostal
    let ville
    let role
    let description
    let credentials
    let dates_role
    let avatarId

    // date du statut
    const dateStatut = data.compte.dates_role

    //Image preview
    const afficherPhoto = event => {
        let img = document.querySelector('.vignette_profil')
        img.src = event.target.value
    }

    // Validation du formulaire
    const onSubmit = (event) => {
        event.preventDefault();
        modifcompte({
            variables: {
                id: data.compte.id,
                nom: nom.value,
                prenom: prenom.value,
                email: email.value,
                telephone: telephone.value,
                adresse: {
                    libelle1: libelle1.value,
                    libelle2: libelle2.value,
                    codePostal: codePostal.value,
                    ville: ville.value,
                },
                role,
                role_def: {
                    description: description.value,
                    credentials: credentials.value
                },
                dates_role: dates_role.value,
                avatarId: avatarId.value,
            },
        }).then(() => {
            return (
                alert("Modification réussie !!!")
            )
        })
    }

    return (
        <div className="modificationCompte">
            <h1 >Modification du compte</h1>

            <div className="retourComptes">
                <ul className="lienDetail">
                    <li>
                        <Link to={`/compte/${data.compte.id}`} className="waves-effect waves-light btn modification">Détail du compte</Link>
                    </li>
                    <li>
                        <Link to="/comptes" className="waves-effect waves-light btn retourListe">Retour à la liste des comptes</Link>
                    </li>
                </ul>
            </div>
            <div className="row">
                <form className="col s12 formCompte" onSubmit={onSubmit} >
                    <div className="row">
                        <div className="input-field col s4">
                            <select className="browser-default" ref={(ref) => role = ref} required>
                                <option value={data.compte.role} defaultValue="selected">{data.compte.role}</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="ANIMATEUR">ANIMATEUR</option>
                                <option value="STAGIAIRE">STAGIAIRE</option>
                            </select>
                        </div>
                        <div className="input-field col s4">
                            <select className="browser-default" ref={(ref) => description = ref} required>
                                <option value={data.compte.role_def.description} defaultValue="selected">{data.compte.role_def.description}</option>
                                <option value="ADMIN : Administrateur du site">Administrateur du site</option>
                                <option value="ANIMATEUR : Animateur du site">Animateur du site</option>
                                <option value="STAGIAIRE : Personne en formation">Personne en formation</option>
                            </select>
                        </div>
                        <div className="input-field col s4">
                            <select className="browser-default" ref={(ref) => credentials = ref} required>
                                <option value={data.compte.role_def.credentials} defaultValue="selected">{data.compte.role_def.credentials}</option>
                                <option value="ADMIN : Tous les pouvoirs">ADMIN : Tous les pouvoirs </option>
                                <option value="ANIMATEUR : Modifie son compte, Création, Modification, Liste ses fiches journalières">ANIMATEUR : Modifie son compte, Création, Modification, Liste ses fiches journalières</option>
                                <option value="STAGIAIRE : Aucun pouvoirs">STAGIAIRE : Aucun pouvoirs</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input value={dateStatut} defaultValue="selected" id="dates_role" type="date" className="validate" ref={(ref) => dates_role = ref} required />
                            <label htmlFor="dates_role">Date de création du role</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.nom} id="nom" type="text" placeholder="Nom" className="validate" ref={(ref) => nom = ref} />
                            <label htmlFor="nom"></label>
                        </div>
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.prenom} id="prenom" type="text" placeholder="Prénom" className="validate" ref={(ref) => prenom = ref} />
                            <label htmlFor="prenom"></label>
                        </div>
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.email} id="email" type="email" placeholder="Email" className="validate" ref={(ref) => email = ref} />
                            <label htmlFor="email"></label>
                            <span className="helper-text">exemple@xxx.com</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.telephone} id="telephone" type="text" placeholder="Téléphone" className="validate" ref={(ref) => telephone = ref} />
                            <label htmlFor="telephone"></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.adresse.libelle1} id="libelle1" type="text" placeholder="Adresse" className="validate" ref={(ref) => libelle1 = ref} />
                            <label htmlFor="libelle1"></label>
                            <span className="helper-text">exemple : 25 rue du platane</span>
                        </div>
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.adresse.libelle2} id="libelle2" type="text" placeholder="Complément" className="validate" ref={(ref) => libelle2 = ref} />
                            <label htmlFor="libelle2"></label>
                            <span className="helper-text">exemple : appt 12, étage..</span>
                        </div>
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.adresse.codePostal} id="codePostal" type="text" placeholder="Code postal" className="validate" ref={(ref) => codePostal = ref} />
                            <label htmlFor="codePostal"></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input defaultValue={data.compte.adresse.ville} id="ville" type="text" placeholder="Ville" className="validate" ref={(ref) => ville = ref} />
                            <label htmlFor="ville"></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <select id="avatarId" name="avatarId" onChange={e => afficherPhoto(e)} ref={(ref) => avatarId = ref} className="browser-default">
                                <option value={data.compte.avatarId} defaultValue="selected">Avatar actuel</option>
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
                            <img src={data.compte.avatarId} alt="" className='vignette_profil' />
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Envoyer </button>
                </form>
            </div>
        </div>
    )
}
