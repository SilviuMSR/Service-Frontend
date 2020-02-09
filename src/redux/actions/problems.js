import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'
import queryString from 'query-string'

const baseRoute = '/problems'

export const get = queryParams => dispatch =>
    axios.get(baseRoute + `?${queryString.stringify(queryParams)}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getById = problemId => dispatch =>
    axios.get(`${baseRoute}/${problemId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const create = problem => dispatch =>
    axios.post(baseRoute, { problem })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const edit = (problemId, problem, modifySteps) => dispatch =>
    axios.put(`${baseRoute}/${problemId}?${modifySteps ? 'modifySteps=true' : ''}`, { problem })
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const del = problemId => dispatch =>
    axios.delete(`${baseRoute}/${problemId}`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)