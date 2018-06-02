import {createUser, getOneUser} from '../aws-ops'
import {Auth} from 'aws-amplify'
import {fetchFavorites, removeFaveFromMenu} from './favorites'
import history from '../components/history'

// INITIAL STATE

const initialState = {
  email: '',
  signedIn: false,
  session: {}
}

// ACTION TYPES

export const GET_USER = 'GET_USER'
export const NEW_USER = 'NEW_USER'
export const SIGNOUT_USER = 'SIGNOUT_USER'
export const GET_USER_SESSION = 'GET_USER_SESSION'
export const REMOVE_SESSION = 'REMOVE_SESSION'

// ACTION CREATORS

export function getUser (username) {
  const action = {type: GET_USER, username}
  return action
}

export function newUser (username) {
  const action = {type: NEW_USER, username}
  return action
}

export function signoutUser () {
  const action = {type: SIGNOUT_USER}
  return action
}

export function getUserSession (session) {
  const action = {type: GET_USER_SESSION, session}
  return action
}

export function removeSession () {
  const action = {type: REMOVE_SESSION}
  return action
}

// THUNKS

export function fetchUser (username) {
  return function thunk (dispatch) {
    getOneUser(username)
      .then(res => {
        let action = getUser(username)
        dispatch(action)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function generateUser (username) {
  return function thunk (dispatch) {
    createUser(username)
      .then(res => {
        let action = newUser(username)
        dispatch(action)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function getSession () {
  return function thunk (dispatch) {
    Auth.currentAuthenticatedUser()
      .then(res => {
        console.log('resingetSesh', res)
        dispatch(getUserSession(res))
        dispatch(fetchFavorites(res))
        history.push('/')
      })
      .catch(err => console.error(err))
  }
}

export function removeSessionFromState () {
  return function thunk (dispatch) {
    dispatch(removeSession())
    history.push('/')
  }
}

export function signOutTheUser () {
  return function thunk (dispatch) {
    Auth.signOut()
      .then(res => {
        let action = signoutUser()
        let action2 = removeFaveFromMenu()
        dispatch(action)
        dispatch(action2)
        history.push('/')
      })
  }
}

// REDUCER

const rootUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, {email: action.username, signedIn: true})
    case NEW_USER:
      return Object.assign({}, state, {email: action.username, signedIn: true})
    case SIGNOUT_USER:
      return Object.assign({}, state, {signedIn: false, session: {}, email: ''})
    case GET_USER_SESSION:
      return Object.assign({}, state, {session: action.session, email: action.session.attributes.email})
    case REMOVE_SESSION:
      return Object.assign({}, state, {session: {}, email: ''})
    default:
      return state
  }
}

export default rootUserReducer
