import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootFontReducer from './reducers/fonts'
import rootStatusReducer from './reducers/status'
import rootFavoritesReducer from './reducers/favorites'

const reducer = combineReducers({rootFontReducer, rootStatusReducer, rootFavoritesReducer})
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
export default store
