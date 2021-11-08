import axios from 'axios'

const api = axios.create({
    // baseURL: `http://25.62.169.237:9000` // raul trampo
    // baseURL: `http://25.62.169.237:9000` // raul casa
    baseURL: `http://localhost:9000`

})

export default api