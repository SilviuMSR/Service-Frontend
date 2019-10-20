import axios from 'axios'
import config from '../config/local.json'

export default axios.create({
    baseURL: config.baseUrl,
    withCredentials: true
})