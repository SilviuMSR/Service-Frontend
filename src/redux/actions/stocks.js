import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/pieces'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = stockId => dispatch =>
    axios.get(`${baseRoute}/${stockId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = piece => dispatch =>
    axios.post(baseRoute, { piece })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (stockId, piece) => dispatch =>
    axios.put(`${baseRoute}/${stockId}`, { piece })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const del = stockId => dispatch =>
    axios.delete(`${baseRoute}/${stockId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)