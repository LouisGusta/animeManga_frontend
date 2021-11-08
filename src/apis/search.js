import _ from 'lodash'
import api from '../services/api'

export const requestMangas = _.memoize(async title => {
    const res = await api.get('/manga/search', {
        headers: {
            querysearch: title
        }
    })
    if (res.status !== 200) return []

    const mangasArray = await res.data

    return mangasArray
})