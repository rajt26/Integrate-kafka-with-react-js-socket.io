import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers/index'
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'


const store = createStore(rootReducer,applyMiddleware(ReduxThunk,logger)) // create redux store and pass root reducers

export default store