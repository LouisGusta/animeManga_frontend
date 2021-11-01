import axios from 'axios'

const api = axios.create({
    baseURL: `http://25.62.169.237:9000`
})

export default api;