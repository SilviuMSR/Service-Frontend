import { combineReducers } from 'redux'

import reservation from './reservation'
import login from './login'

export default combineReducers({
    reservation,
    login
})