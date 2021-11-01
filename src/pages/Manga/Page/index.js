import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Parse from 'html-react-parser'

import './index.css'

import Nav from '../../../components/Nav';
import api from '../../../services/api';

export default function Manga() {
    const location = useLocation()
    const [manga, setManga] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [blur, setBlur] = useState(false)

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

    useEffect(() => {
        if (Object.keys(manga).length > 0) {
            if (manga.isAdult) {
                setBlur(true)
            }
        }
    })

    const showFullDesc = () => {
        setShowModal(!showModal)
    }

    const mangaFullDesc = showModal ? 'show' : 'hidden'
    const classBlur = blur ? 'showBlur' : 'hiddenBlur'
    return (
        <>
            <div className={'manga-dark-background ' + mangaFullDesc} onClick={showFullDesc}></div>
            <Nav />
            <div className={'manga-full-desc ' + mangaFullDesc}>
                <h2>{Object.keys(manga).length > 0 ? Parse(manga.description) : ''}</h2>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={showFullDesc}
                >
                    <p
                        style={{
                            padding: '10px',
                            maxWidth: '90%',
                            maxHeight: '90%',
                            fontFamily: `'Montserrat' sans-serif`,
                            fontStyle: 'normal',
                            fontWeight: '900',
                            fontSize: '25px',
                            lineHeight: '30px',
                            alignItems: 'center',
                            letterSpacing: '0.1em',

                            color: '#FFFFFF',

                            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        CLOSE
                    </p>
                </div>
            </div>

            <div className='manga-page-container' >
                <div className={'manga-page-banner ' + classBlur}>
                    <img
                        src={Object.keys(manga).length > 0 ? manga.bannerImage : ''}
                    />
                </div>

                <div className='manga-page-infos'>
                    <div
                        className={'manga-page-card ' + classBlur}
                    >
                        <img
                            src={Object.keys(manga).length > 0 ? manga.coverImage.extraLarge : ''}
                        />
                    </div>
                    <div className='manga-page-title'>
                        <h2>{Object.keys(manga).length > 0 ? manga.title.romaji : ''}</h2>
                        <h2>CRIAR</h2>
                    </div>
                </div>
                <a onClick={showFullDesc}>
                    <div className='manga-page-desc'>
                        <h2>{Object.keys(manga).length > 0 ? manga.description.length > 458 ? Parse(manga.description.substr(0, 458) + '...') : Parse(manga.description) : ''}</h2>
                    </div>
                </a>
            </div>


        </>
    )
}