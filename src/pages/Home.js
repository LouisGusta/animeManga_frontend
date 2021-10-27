import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'


import SearchBar from '../components/SearchBar'
import { requestMangas } from '../apis/searchManga';
import MangaSearch from '../components/MangaSearch';

export default function Home() {
    const [mangas, setMangas] = useState([])

    const onSearchSubmit = useCallback(async term => {
        const mangasArray = await requestMangas(term.toLowerCase())
        setMangas(mangasArray)
    })

    const clearResults = useCallback(() => setMangas([]))

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

            <SearchBar onSearchSubmit={onSearchSubmit} clearResults={clearResults} mangas={mangas} />

        </div>
    )
}
