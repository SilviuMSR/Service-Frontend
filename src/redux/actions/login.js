import axios from '../../utils/axios'
import * as TYPES from '../actionTypes'

export const login = (username, password) => dispatch => axios.post('/login', {
    username,
    password
}).then(response => {
    dispatch({
        type: TYPES.LOGIN,
        payload: {
            username: response.data.username,
            userId: response.data.id
        }
    })
    return Promise.resolve(response)
})

export const isLogged = () => dispatch => axios.get('/logged')
    .then(response => {
        dispatch({
            type: TYPES.IS_LOGGED,
            payload: {
                username: response.data.username,
                userId: response.data.userId
            }
        })
        return Promise.resolve()
    })

export const logout = () => dispatch => axios.post('/logout')
    .then(response => {
        dispatch({
            type: TYPES.IS_NOT_LOGGED
        })
        return Promise.resolve(response)
    })