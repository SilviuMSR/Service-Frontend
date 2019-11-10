import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/models'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = modelId => dispatch =>
    axios.get(`${baseRoute}/${modelId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = model => dispatch =>
    axios.post(baseRoute, { model })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (modelId, model) => dispatch =>
    axios.put(`${baseRoute}/${modelId}`, { model })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const del = modelId => dispatch =>
    axios.delete(`${baseRoute}/${modelId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)