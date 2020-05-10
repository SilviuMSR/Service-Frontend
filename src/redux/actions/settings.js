import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'

const baseRoute = '/settings'

export const startNotifications = () => dispatch =>
    axios.post(`${baseRoute}/start`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const stopNotifications = () => dispatch =>
    axios.post(`${baseRoute}/stop`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const editSettings = settings => dispatch =>
    axios.post(`${baseRoute}`, { settings })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getSettings = () => dispatch =>
    axios.get(`${baseRoute}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)