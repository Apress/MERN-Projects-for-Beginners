import axios from 'axios'

const instance = axios.create({
    baseURL: "https://dating-mern-backend.herokuapp.com"
})

export default instance