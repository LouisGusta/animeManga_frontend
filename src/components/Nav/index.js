import React, { useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.css'

const Nav = () => {

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
                    <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="login">
                            <h2>
                                LOGIN
                            </h2>
                        </div>
                    </Link>

                </div>
            </div >
        </>
    )
}

export default Nav