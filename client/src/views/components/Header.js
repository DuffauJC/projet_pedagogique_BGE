import React from 'react'


export default function Header() {
    
    return (
        <div className="headWrapper">
            <div className="head_logo">
                <img src='/assets/images/logo_bge.png' alt=""  />
            </div>

            <div className="head_title">
                <h1>Projet pédagogique</h1>
                <h4>Version React</h4>
            </div>

            <div className="head_profil">
                <img src='/assets/avatar/user.png' alt=""  className='roundedImage' />
            </div>
        </div>
    )
}
