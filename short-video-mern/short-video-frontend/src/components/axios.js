import axios from 'axios'

const instance = axios.create({
    baseURL: "https://short-video-backend.herokuapp.com"
})

export default instance
