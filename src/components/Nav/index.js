import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Nav = (props) => {
    const { user_id, avatar } = props

    const redirect = user_id ? '/' : '/login'
    return (
        <>

            <div className="main-container">
                <div className="nav">
                    <div className="logo">
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2>LOGO</h2>
                            {/* <img src={logo} alt="Manga"/> */}
                        </Link>
                    </div>
                    <Link to={redirect} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="login">
                            {
                                user_id ?
                                    <img src={avatar} alt='avatar/foto de perfil do usuario' />
                                    :
                                    <h2>
                                        LOGIN
                                    </h2>
                            }
                        </div>
                    </Link>

                </div>
            </div >
        </>
    )
}

export default Nav