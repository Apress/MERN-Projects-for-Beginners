import axios from 'axios'

const instance = axios.create({
    baseURL: "https://popular-social-backend.herokuapp.com"
})
export default instance
