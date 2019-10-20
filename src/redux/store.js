import {compose, applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../redux/reducers/index'
import logger from 'redux-logger'

const middleware = applyMiddleware(thunk, logger)
//const middleware = applyMiddleware(thunk)
const rootReducer = (state, action) => {
    return reducers(state, action)
}

const store = createStore(
    rootReducer,
    compose(middleware)
)

export default store