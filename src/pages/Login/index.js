import React from "react"
import './index.css'

import { MdLogin } from "react-icons/md";


export default function Login() {
    return (
        <>
            <div className='login-page'>
                <div className='login-container'>
                    <label>Login</label>
                    <input className='user-input' type='text' name='login' placeholder='Usuário ou e-mail' />
                    <label>Senha</label>
                    <input className='pass-input' type='password' name='password' placeholder='Senha' />
                    <span style={{
                        color: 'rgba(var(--white), .8)'
                    }}>Não consegue logar?</span>
                    <button className='btn-login'><MdLogin size={40} /></button>
                </div>
                <div className='call-register'>
                    <div className='dialog'></div>
                    <div className='komi-san-container' ><div className='komi-san'></div></div>
                </div>
            </div>
        </>
    )
}