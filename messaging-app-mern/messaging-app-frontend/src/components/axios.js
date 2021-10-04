import axios from 'axios'

const instance = axios.create({
    baseURL: "https://messaging-app-backend.herokuapp.com"
})

export default instance
