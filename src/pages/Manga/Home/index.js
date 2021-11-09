import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'

import './index.css'

import Nav from '../../../components/Nav/'
import SearchBar from '../../../components/manga/SearchBar/'
import { requestMangas } from '../../../apis/search'

export default function Home(props) {
    const [mangas, setMangas] = useState([])
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

    const onSearchSubmit = useCallback(async term => {
        const mangasArray = await requestMangas(term.toLowerCase())
        setMangas(mangasArray)
    })
    const clearResults = useCallback(() => setMangas([]))

    return (
        <>
            <Nav
                avatar={profile ? profile.avatar : ''}
                user_id={profile ? profile._id : ''}
            />
            <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults} mangas={mangas} />
        </>
    )
}
