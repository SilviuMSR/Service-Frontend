import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/reservations'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = reservationId => dispatch =>
    axios.get(`${baseRoute}/${reservationId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getByEmployeeId = employeeId => dispatch =>
    axios.get(`${baseRoute}/employee/${employeeId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = reservation => dispatch =>
    axios.post(baseRoute, { reservation })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (reservationId, reservation) => dispatch =>
    axios.put(`${baseRoute}/${reservationId}`, { reservation })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const del = reservationId => dispatch =>
    axios.delete(`${baseRoute}/${reservationId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)