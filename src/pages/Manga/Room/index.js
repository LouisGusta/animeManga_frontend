import React, { useState, useEffect } from "react"
import socketIOClient from "socket.io-client"

import Nav from '../../../components/Nav'
import api from '../../../services/api'

export default function Room(props) {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        async function getProfile(id) {
            const response = await api.get('/profile', {
                headers: {
                    user_id: id
                }
            })
            setProfile(response.data)
        }
        if (localStorage.getItem('user_id')) {
            const loggedInUser = localStorage.getItem('user_id')
            getProfile(loggedInUser)
        }
    }, [props.location.state])

    console.log(profile)
    const Desconectar = () => {
        const socket = socketIOClient(api.defaults.baseURL + '/room')
        socket.emit('leaveRoom', { idRoom: props.location.state.idRoom, idSocket: props.location.state.idSocket, idUser: profile._id })
        props.history.push({
            pathname: '/manga/'
        })
    }

    return (
        <>
            <Nav
                avatar={profile ? profile.avatar : ''}
                user_id={profile ? profile._id : ''}
            />

            <button style={{ margin: 'auto' }} onClick={Desconectar}>Desconectar</button>
        </>
    )
}