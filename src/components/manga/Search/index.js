import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';


const MangaSearch = ({ manga }) => {
    const name = manga.title.romaji.replaceAll(/[.,()]/gm, '').replaceAll(' ', '-')

    return (
        <Link to={{
            pathname: `/manga/${name}`,
            state: {
                id: manga.id,
                title: manga.title,
                coverImage: manga.coverImage,
                format: manga.format,
                status: manga.status,
                bannerImage: manga.bannerImage,
                genres: manga.genres,
                isAdult: manga.isAdult,
                averageScore: manga.averageScore
            }
        }} >
            <div className='manga-container'>
                <img className='manga-cover' src={manga.coverImage.extraLarge} />
                <div className='manga-infos'>
                    <div className='manga-title'>
                        <span className='texts title'> {manga.title.romaji} </span>
                        <span className='texts status'> {manga.status} </span>

                    </div>

                    <div className='container-tags'>
                        <span className='texts tags'> {manga.genres.join(',\t') + '.'} </span>
                    </div>
                    <span className='texts chapters'> Cápitulos: 360 </span>
                </div>
            </div>
        </Link >

    )
}

export default MangaSearch