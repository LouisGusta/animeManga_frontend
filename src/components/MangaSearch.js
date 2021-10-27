import React from 'react';
import './styles/MangaSearch.css'

const MangaSearch = ({ manga }) => {
    return (
        <div className='manga-container'>
            <img className='manga-cover' src={manga.urlCover} />
            <div className='manga-infos'>
                <div className='manga-title'>
                    <span className='texts title'> {manga.title} </span>
                    <span className='texts status'> {manga.status} </span>

                </div>

                <div className='container-tags'>
                    <span className='texts tags'> {manga.tags.join(',\t') + '.'} </span>
                </div>
                <span className='texts chapters'> Cápitulos: 360 </span>
            </div>
        </div>
    )
}

export default MangaSearch;