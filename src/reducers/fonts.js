import axios from 'axios'
import { googleAPIKey } from '../../secrets'

// INITIAL STATE

const initialState = {
  fetching: false,
  fetched: false,
  fontList: {},
  familyList: {}
}

// ACTION TYPES

export const GET_FONTS = 'GET_FONTS'
export const GET_FAMILY = 'GET_FAMILY'
// ACTION CREATORS

export function getFonts (fontList) {
  const action = {type: GET_FONTS, fontList}
  return action
}

export function getFamily (familyList) {
  const action = {type: GET_FAMILY, familyList}
  return action
}

// THUNKS

export function fetchFonts () {
  return function thunk (dispatch) {
    return axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleAPIKey}`)
      .then(res => res.data)
      .then(fonts => {
        const action = getFonts(fonts)
        // const arrFam = fonts.items.map(font => {
        //   return font.family
        // })
        // const action2 = getFamily(arrFam)
        dispatch(action)
        // dispatch(action2)
      })
      .catch(err => console.log(err))
  }
}

// REDUCERS

const rootFontReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FONTS:
      return Object.assign({}, state, {fontList: action.fontList})
    case GET_FAMILY:
      return Object.assign({}, state, {familyList: action.familyList})
    default:
      return state
  }
}

export default rootFontReducer
