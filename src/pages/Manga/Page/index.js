import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Parse from 'html-react-parser'

import './index.css'

import Nav from '../../../components/Nav'
import api from '../../../services/api'

export default function Manga(props) {
    const location = useLocation()
    const [manga, setManga] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [blur, setBlur] = useState(false)
    const [profile, setProfile] = useState({})
    const [showModalRoom, setShowModalRoom] = useState(false)
    const [termPassRoom, setTermPassRoom] = useState('')
    const [termCapacityNumber, setTermCapacityNumber] = useState('')

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
    }, [location.state.title.romaji])

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

    const openModalRoom = () => {
        setShowModalRoom(!showModalRoom)
    }

    const requestSession = () => {
        console.log(termPassRoom + ' ' + termCapacityNumber)
    }

    const mangaFullDesc = showModal ? 'show' : 'hidden'
    const classBlur = blur ? 'showBlur' : 'hiddenBlur'
    return (
        <>
            <div className={'manga-full-desc ' + mangaFullDesc}>
                <h2>{Object.keys(manga).length > 0 && manga.description ? Parse(manga.description) : ''}</h2>
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
                            fontFamily: 'var(--pattern-font)',
                            fontStyle: 'normal',
                            fontWeight: '900',
                            fontSize: '25px',
                            lineHeight: '30px',
                            alignItems: 'center',
                            letterSpacing: '0.1em',

                            color: 'rgba(var(--white), 1.0)',

                            textShadow: '0px 4px 4px rgba(var(--white), 0.25)',
                        }}
                    >
                        CLOSE
                    </p>
                </div>
            </div>
            <div className={'dark-page ' + mangaFullDesc} onClick={showFullDesc}></div>

            <Nav
                avatar={profile ? profile.avatar : ''}
                user_id={profile ? profile._id : ''}
            />

            <div className='manga-page-full-content' >
                <div className='manga-page-header-wrapper'>

                    <div className={'manga-page-banner ' + classBlur} style={{ backgroundImage: `url(${Object.keys(manga).length > 0 ? manga.bannerImage : ''})` }}>
                        <div className="shadow"></div>
                    </div>

                    <div className='manga-page-header'>
                        <div className='manga-page-header-container'>
                            <div className='manga-page-cover'>
                                <div className='manga-page-cover-inner'>
                                    <img
                                        src={Object.keys(manga).length > 0 ? manga.coverImage.extraLarge : ''}
                                    />
                                </div>
                            </div>

                            <div className='manga-page-content'>
                                <div className='manga-page-wrapper'>
                                    <div className='manga-page-title'>
                                        <h2>{Object.keys(manga).length > 0 ? manga.title.romaji : ''}</h2>
                                    </div>
                                    <div className="dropdown-wrapper">
                                        <div className='manga-page-open-room'  >
                                            <h2 onClick={openModalRoom}>Criar</h2>
                                            <div className='dropdown' style={{
                                                height: showModalRoom ? '200px' : '0px',

                                            }}>
                                                <input
                                                    className='pass-input-room'
                                                    type='password' name='password'
                                                    placeholder='Senha'
                                                    onChange={event => setTermPassRoom(event.target.value)}
                                                    style={{ margin: '20px 20px 0px 20px' }}
                                                />
                                                <div className='capacity' style={{ margin: '0px 20px 0px 20px' }}>
                                                    <p>Capacidade</p>
                                                    <input
                                                        min="0" max="20" className='capacity-input-room'
                                                        type="number" id="capacity" name="capacity"
                                                        style={{
                                                            width: '80px',
                                                            marginLeft: '25px'
                                                        }}
                                                        onChange={event => setTermCapacityNumber(event.target.value)}
                                                    />
                                                </div>
                                                <div style={{ width: '100%', margin: '0px 20px 0px 20px;' }}>
                                                    <p
                                                        onClick={() => requestSession()}
                                                        style={{ float: 'right', right: '10px', position: 'relative' }}
                                                    >
                                                        Ler
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <a onClick={showFullDesc}>
                                    <p className='manga-page-description'>{Object.keys(manga).length > 0 && manga.description ? manga.description.length > 458 ? Parse(manga.description.substr(0, 458) + '...') : Parse(manga.description) : ''}</p>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='manga-page-content-container'>
                    <div className='manga-page-sidebar' style={{ marginTop: 0 }}>
                        <div className='manga-page-data'>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Formato</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.format : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Status</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.status : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Data de inicio</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.startDate.day + '/' + manga.startDate.month + '/' + manga.startDate.year : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Generos</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.genres.join(', ') : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Origem</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.countryOfOrigin : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Romaji</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.title.romaji : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Inglês</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.title.english : ''}</div>
                            </div>
                            <div className="manga-page-data-set" style={{ paddingBottom: '14px' }}>
                                <div className="manga-page-type">Nativo</div>
                                <div className="manga-page-value">{Object.keys(manga).length > 0 ? manga.title.native : ''}</div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}