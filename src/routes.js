import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/Home/'
import Manga from './pages/Manga/'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Home} />
            <Route path="/manga/:name" component={Manga} />
        </BrowserRouter>
    );
}