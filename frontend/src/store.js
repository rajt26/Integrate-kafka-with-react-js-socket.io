import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers/index'
import logger from 'redux-logger'
import {socket} from './socket/index'
import ReduxThunk from 'redux-thunk'


const store = createStore(rootReducer,applyMiddleware(ReduxThunk,logger))

export default store