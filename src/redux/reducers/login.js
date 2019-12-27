import * as TYPES from '../actionTypes'

const initialState = {
    isLogged: false,
    logged: false,
    roles: [],
    allRoles: [],
    username: '',
    providerId: '',
    userId: null
}

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case TYPES.IS_LOGGED:
            return { ...state, isLogged: true, username: action.payload.username, userId: action.payload.userId }
        case TYPES.LOGIN:
            return { ...state, isLogged: true, username: action.payload.username, userId: action.payload.userId }
        case TYPES.IS_NOT_LOGGED:
            return { ...state, isLogged: false }
        case TYPES.GET_ROLES:
            return { ...state, allRoles: action.payload.allRoles }
        case TYPES.CHANGE_USERNAME:
            return { ...state, username: action.payload }
        default:
            return state
    }
}

export default loginReducer