import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.css'


import Nav from '../../components/Nav/';
import api from '../../services/api';

export default function Manga() {
    const location = useLocation()
    const [manga, setManga] = useState({})

    useEffect(() => {
        async function getMangaInfo() {
            const response = await api.get('/manga/resume', {
                headers: {
                    querysearch: location.state.title.romaji
                }
            })

            setManga({ ...response.data, ...location.state })
        }

        getMangaInfo()
    }, [location.state])

    return (
        <>
            <Nav />
            {/* <div>{manga.media.id}</div> */}
            <div className='manga-page-container'>
                <div className='manga-page-banner'>
                    <img src={Object.keys(manga).length > 0 ? manga.bannerImage : ''} />
                </div>

                <div className='manga-page-infos'>
                    <div className='manga-page-card'>
                        <img src={Object.keys(manga).length > 0 ? manga.coverImage.extraLarge : ''} />
                    </div>
                    <div className='manga-page-title'>
                        <h2>{Object.keys(manga).length > 0 ? manga.title.romaji : ''}</h2>
                        <h2>CRIAR</h2>
                    </div>
                </div>
                <div className='manga-page-desc'>
                    <h2>{Object.keys(manga).length > 0 ? manga.title.romaji : ''}</h2>
                </div>
            </div>
        </>
    )
}