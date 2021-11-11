import React, { useEffect, useRef, useState } from 'react'
import { RotateCircleLoading } from 'react-loadingg'
import './index.css'

import Search from '../../../assets/magnifier.svg'
import MangaSearch from '../Search/'

const SearchBar = ({ onSearchSubmit, clearResults, mangas }) => {
    const [term, setTerm] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState(term)
    const [expand, setExpand] = useState(false)
    const [height, setHeight] = useState('80px')
    const node = useRef()
    const input = useRef()

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), 500)
        return () => clearTimeout(timer)
    }, [debouncedTerm])

    useEffect(() => {
        if (term !== '') {
            onSearchSubmit(term)
        } else {
            clearResults()
        }
    }, [term])

    const handleClick = e => {
        if (node.current.contains(e.target)) {

            return
        }

        setExpand(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    const renderedMangas = mangas.map((manga, i) => {

        return <MangaSearch manga={manga} key={i} />
    })


    const handleExpand = (e) => {
        if (e != '') {
            setExpand(true)
        } else {
            setExpand(false)
        }
    }

    return (
        <div ref={node} className='search-container'
            style={{
                height: !expand ? height : '500px',
            }}
        >
            <div className='input-container'>
                <input
                    ref={input}
                    className="search-input"
                    type="text"
                    placeholder="Pesquise seu manga"
                    value={debouncedTerm}
                    onChange={event => [setDebouncedTerm(event.target.value), handleExpand(event.target.value)]}
                    onClick={e => e.target.value != '' ? setExpand(!expand) : setExpand(expand)}
                />

                <img
                    className="search-icon"
                    src={Search}
                    alt="search-icon"
                    onClick={() => input.current.value != '' ? setExpand(!expand) : setExpand(expand)}
                />
            </div>

            {
                renderedMangas.length == 0 && expand == true ? <RotateCircleLoading size='large' /> : <div className='result-manga'> {renderedMangas} </div>
            }


        </div>


    )
}

export default SearchBar

