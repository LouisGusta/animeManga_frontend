import React, { useState } from "react"
import { MdLogin } from "react-icons/md";

import api from '../../services/api'

import './index.css'

export default function Register({ history }) {

    const [termUserName, setTermUserName] = useState('')
    const [termEmail, setTermEmail] = useState('')
    const [termPass, setTermPass] = useState('')

    const submitRegister = async () => {
        const response = await api.post('/register', {
            username: termUserName,
            email: termEmail,
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
            <div className='register-page'>
                <div className='register-container'>
                    <label for='username'>Nome de usuário</label>

                    <input
                        className='user-register-input'
                        type='text' name='username' id='username'
                        placeholder='Usuário'
                        onChange={event => setTermUserName(event.target.value)}
                    />

                    <label for='email'>Email</label>

                    <input
                        className='email-input'
                        type='text' name='email' id='email'
                        placeholder='E-mail de otaku'
                        onChange={event => setTermEmail(event.target.value)}
                    />

                    <label for='password'>Senha</label>

                    <input
                        className='pass-register-input'
                        type='password' name='password' id='password'
                        placeholder='Senha'
                        onChange={event => setTermPass(event.target.value)}
                    />

                    <span
                        style={{
                            color: 'rgba(var(--white), .8)'
                        }}>
                        <input type='checkbox' name='terms' id='terms' /> <label for='terms'>Aceito os termos.</label>
                    </span>

                    <button
                        className='btn-register'
                        onClick={submitRegister}
                    >
                        <MdLogin size={40} />
                    </button>
                </div>
                <div className='bar'></div>
            </div>
        </>
    )
}