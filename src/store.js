import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootFontReducer from './reducers/fonts'
import rootStatusReducer from './reducers/status'
import rootFavoritesReducer from './reducers/favorites'
import rootUserReducer from './reducers/user'

const reducer = combineReducers({rootFontReducer, rootStatusReducer, rootFavoritesReducer, rootUserReducer})
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
export default store
