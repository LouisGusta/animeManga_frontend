import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

import Nav from '../../../components/Nav/'
import SearchBar from '../../../components/manga/SearchBar/'
import { requestMangas } from '../../../apis/search'

export default function Home() {
    const [mangas, setMangas] = useState([])

    const onSearchSubmit = useCallback(async term => {
        const mangasArray = await requestMangas(term.toLowerCase())
        setMangas(mangasArray)
    })

    const clearResults = useCallback(() => setMangas([]))

    return (
        <>
            <Nav />
            <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults} mangas={mangas} />
        </>
    )
}
