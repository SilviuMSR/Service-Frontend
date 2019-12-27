import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/brands'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = brandId => dispatch =>
    axios.get(`${baseRoute}/${brandId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = brand => dispatch =>
    axios.post(baseRoute, { brand })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (brandId, brand) => dispatch =>
    axios.put(`${baseRoute}/${brandId}`, { brand })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const del = brandId => dispatch =>
    axios.delete(`${baseRoute}/${brandId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)