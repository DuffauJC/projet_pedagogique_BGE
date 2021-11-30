import React, { useState } from 'react'
import { login } from '../../config/auth';


export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const  submitForm = event => {
        event.preventDefault()
        login(email,password)

    }

    return (
        <div className="pageConnect">
            <h1>Identification</h1>
            <form className="col s12 formConnect" onSubmit={submitForm}>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" name="email" className="validate" onChange={event => setEmail(event.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="motDePasse" type="password" name="motDePasse" className="validate" onChange={event => setPassword(event.target.value)}/>
                        <label htmlFor="motDePasse">Mot de passe</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light submitLogin" type="submit">Envoyer </button>
            </form>
        </div>
    )
}
