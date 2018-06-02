import axios from 'axios'
import {allFavorites, putOneFavorite, deleteOneFavorite, createUser} from '../aws-ops'
import { isFetching, isFetched, isErred } from './status'

// INITIAL STATE

const initialState = {
  favoritesList: []
}

// ACTION TYPES

export const GET_FAVORITES = 'GET_FAVORITES'
export const GET_ONEFAVORITE = 'GET_ONEFAVORITE'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const DELETE_FAVORITE = 'DELETE_FAVORITE'
export const REMOVE_FAVE_MENU = 'REMOVE_FAVE_MENU'

// ACTION CREATORS

export function getFavorites (favoritesList) {
  const action = {type: GET_FAVORITES, favoritesList}
  return action
}

export function getOneFavorite (favorite) {
  const action = {type: GET_ONEFAVORITE, favorite}
  return action
}

export function addFavorite (favorite) {
  const action = {type: ADD_FAVORITE, favorite}
  return action
}

export function deleteFavorite (favorite) {
  const action = {type: DELETE_FAVORITE, favorite}
  return action
}

export function removeFaveMenu () {
  const action = {type: REMOVE_FAVE_MENU}
  return action
}
// THUNKS

export function fetchFavorites (username) {
  return function thunk (dispatch) {
    allFavorites(username)
      .then(res => {
        console.log('res***', res)
        dispatch(isFetching())
        return res
      })
      .then(payload => {
        if (payload.Item) {
          let action = getFavorites(payload.Item.f)
          dispatch(action)
        } else {
          createUser(username)
            .then(res => {
              console.log('creating user', res)
              let action2 = getFavorites(res.Item.f)
              dispatch(getFavorites(action2))
            })
            .catch(err => console.error(err))
        }
      })
      .then(dispatch(isFetched()))
      .catch(err => {
        console.error(err)
        dispatch(isErred())
      })
  }
}

export function fetchOneFavorite () {
  return function thunk (dispatch) {
    
  }
}

export function putFavorite (favoriteName) {
  console.log('usernameinputfave', favoriteName)
  return function thunk (dispatch) {
    putOneFavorite(favoriteName)
      .then(res => {
        console.log('resofputfave', res)
        let action = addFavorite({fID: favoriteName.id, fam: favoriteName.family})
        dispatch(action)
      })
      .catch(err => console.log(err))
  }
}

export function removeFavorite (favorite) {
  return function thunk (dispatch) {
    deleteOneFavorite(favorite.id, favorite.family, favorite.favoritesList, favorite.userCred)
      .then(res => {
        let action = deleteFavorite(favorite.family)
        dispatch(action)
      })
      .catch(err => console.log(err))
  }
}

export function removeFaveFromMenu () {
  return function thunk (dispatch) {
    dispatch(removeFaveMenu())
  }
}

// REDUCERS

const rootFavoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return Object.assign({}, state, {favoritesList: action.favoritesList})
    case GET_ONEFAVORITE:
      return Object.assign({}, state, {currentProject: action.project})
    case ADD_FAVORITE:
      return Object.assign({}, state, {favoritesList: [...state.favoritesList, action.favorite]})
    case DELETE_FAVORITE:
      return Object.assign({}, state, {favoritesList: state.favoritesList.filter(favorite => {
        if (favorite.fam !== action.favorite) {
          return favorite
        }
      })})
    case REMOVE_FAVE_MENU:
      return Object.assign({}, state, {favoritesList: []})
    default:
      return state
  }
}

export default rootFavoritesReducer
