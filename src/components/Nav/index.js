import React, { useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.css'

const Nav = () => {
    return (
        <div className="main-container">
            <div className="nav">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2>LOGO</h2>
                        {/* <img src={logo} alt="Manga"/> */}
                    </Link>
                </div>
                <div className="login">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h2>
                            LOGIN
                        </h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav