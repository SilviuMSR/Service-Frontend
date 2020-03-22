import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/users'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = userId => dispatch =>
    axios.get(`${baseRoute}/${userId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = user => dispatch =>
    axios.post(baseRoute, { user })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (userId, user) => dispatch => {
    return axios.put(`${baseRoute}/${userId}`, { user })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)
}

export const del = (userId) => dispatch =>
    axios.delete(`${baseRoute}/${userId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)