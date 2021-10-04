import axios from 'axios'

const instance = axios.create({
    baseURL: "https://photo-social-backend.herokuapp.com"
})
export default instance
