import axios from 'axios'
import {allFavorites, putOneFavorite, deleteOneFavorite} from '../aws-ops'
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
// THUNKS

export function fetchFavorites () {
  return function thunk (dispatch) {
    allFavorites()
      .then(res => {
        console.log('res***', res)
        dispatch(isFetching())
        return res
      })
      .then(payload => {
        let action = getFavorites(payload)
        dispatch(action)
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
  return function thunk (dispatch) {
    putOneFavorite(favoriteName)
      .then(res => {
        let action = addFavorite({fID: favoriteName.id, fam: favoriteName.family})
        dispatch(action)
      })
      .catch(err => console.log(err))
  }
}

export function removeFavorite (favorite) {
  return function thunk (dispatch) {
    deleteOneFavorite(favorite.id, favorite.family, favorite.favoritesList)
      .then(res => {
        let action = deleteFavorite(favorite.family)
        dispatch(action)
      })
      .catch(err => console.log(err))
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
    default:
      return state
  }
}

export default rootFavoritesReducer
