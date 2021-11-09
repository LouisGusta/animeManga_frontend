import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login/'
import Register from './pages/Register/'

import mangaHome from './pages/Manga/Home/'
import mangaPage from './pages/Manga/Page/'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />

            <Route path="/" exact component={mangaHome} />
            <Route path="/manga" exact component={mangaHome} />
            <Route path="/manga/:name" component={mangaPage} />
        </BrowserRouter>
    )
}