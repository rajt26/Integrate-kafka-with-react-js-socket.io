import authentication from './authenticate.reducer'
import posts from './posts.reducer'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    authentication,
    posts
})

export default rootReducer