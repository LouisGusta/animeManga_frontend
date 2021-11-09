import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { MdLogin } from "react-icons/md";

import api from '../../services/api'

import './index.css'


export default function Login({ history }) {
    const [termLogin, setTermLogin] = useState('')
    const [termPass, setTermPass] = useState('')

    const submitLogin = async () => {
        const response = await api.post('/login', {
            login: termLogin,
            password: termPass
        })
        if (response.status == 201) {
            const _idUser = response.data;
            localStorage.setItem('user_id', _idUser)
            history.push('/')
        } else {
            alert(response.data.err)
        }
    }

    return (
        <>
            <div className='login-page'>
                <div className='login-container'>
                    <label>Login</label>

                    <input
                        className='login-input'
                        type='text' name='login'
                        placeholder='Usuário ou e-mail'
                        onChange={event => setTermLogin(event.target.value)}
                    />

                    <label>Senha</label>

                    <input
                        className='pass-input'
                        type='password'
                        name='password'
                        placeholder='Senha'
                        onChange={event => setTermPass(event.target.value)}
                    />
                    <span
                        style={{
                            color: 'rgba(var(--white), .8)'
                        }}>
                        Não consegue logar?
                    </span>

                    <button
                        className='btn-login'
                        onClick={submitLogin}
                    >
                        <MdLogin size={40} />
                    </button>
                </div>
                <div className='call-register'>
                    <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className='dialog'></div>
                        <div className='komi-san-container' >
                            <div className='komi-san'></div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}