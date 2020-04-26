import axios from '../../utils/axios'
import { errorHandler } from '../../utils/apiFunctions'

const baseRoute = '/statistics'

export const getReservationStatistics = () => dispatch =>
    axios.get(`${baseRoute}/reservations`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getEmployeeStatistics = () => dispatch =>
    axios.get(`${baseRoute}/employee`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)

export const getCarsAndProblemsStatistics = () => dispatch =>
    axios.get(`${baseRoute}/carsAndProblems`)
        .then(response => Promise.resolve(response.data))
        .catch(errorHandler)