import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../config/auth'



const GestionComptes = () => {
    return (
        //    <!-- Dropdown Structure -->
        <div className="lienscompte">
            <Link to="/comptes">Liste Comptes</Link>
            <Link to="/compteCreation">Création Compte</Link>
        </div>
    )
}

const GestionFormations = () => {
    return (
        //    <!-- Dropdown Structure -->
        <div className="lienscompte">
            <Link to="/formations">Liste Formations</Link>
            <Link to="/formationCreation">Création Formation</Link>
        </div>
    )
}

const GestionSeances = () => {
    return (
        //    <!-- Dropdown Structure -->
        <div className="lienscompte">
            <Link to="/seances">Liste Seances</Link>
            <Link to="/seanceCreation">Création Seance</Link>
        </div>
    )
}
const GestionStagiaires = () => {
    return (
        //    <!-- Dropdown Structure -->
        <div className="lienscompte">
            <Link to="/stagiaires">Liste Stagiaires</Link>
        </div>
    )
}

const SearchBar = () => {
    return (
        <div>
            <form>
                <div className="searchBar">
                    <input id="search" type="search" placeholder="Recherche" required />
                    <label className="label-icon" htmlFor="search"></label>
                </div>
            </form>
        </div>
    )
}

const Logued = () => {
    if (localStorage.getItem('accessToken')) {
        return (
            <Link to="/" onClick={logout}>Se déconnecter</Link>
        )
    }
    else {
        return (
            <Link to="/login">Se connecter</Link>
        )
    }
}


export default function AdminNavBar() {

    return (
        <div>
            <nav className='adminNavBar'>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li className="dropdown">
                        <GestionComptes />Gestion des comptes
                    </li>
                    <li className="dropdown">
                        <GestionFormations />Gestion des formations
                    </li>
                    <li className="dropdown">
                        <GestionSeances />Gestion des seances
                    </li> <li className="dropdown">
                        <GestionStagiaires />Gestion des stagiaires
                    </li>
                    <li className="right">
                        <SearchBar />
                    </li>
                    <li className="right"><a href="#">Contactez l'administrateur</a></li>
                    <li className="login right ">
                        <Logued/>
                        {/* <Link to="/login">Se connecter</Link> */}
                    </li>
                </ul>

            </nav>
        </div>
    )
}
