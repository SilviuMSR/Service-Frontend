import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/vacations'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = vacationRequestId => dispatch =>
    axios.get(`${baseRoute}/${vacationRequestId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = vacationRequest => dispatch =>
    axios.post(baseRoute, { vacationRequest })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (vacationRequestId, vacationRequest) => dispatch => {
    return axios.put(`${baseRoute}/${vacationRequestId}`, { vacationRequest })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)
}

export const del = (vacationRequestId) => dispatch =>
    axios.delete(`${baseRoute}/${vacationRequestId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)