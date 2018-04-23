import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootFontReducer from './reducers/fonts'
import rootProjectReducer from './reducers/projects'
import rootStatusReducer from './reducers/status'

const reducer = combineReducers({rootFontReducer, rootProjectReducer, rootStatusReducer})
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))
export default store
