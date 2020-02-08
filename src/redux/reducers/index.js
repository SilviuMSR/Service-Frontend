import { combineReducers } from 'redux'

import reservation from './reservation'
import language from './language'
import login from './login'

export default combineReducers({
    reservation,
    language,
    login
})