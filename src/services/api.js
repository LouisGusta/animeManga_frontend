import axios from 'axios'

const api = axios.create({
    baseURL: 'http://25.5.62.68:9000'
});

export default api;