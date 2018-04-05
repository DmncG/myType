import axios from 'axios'
import { googleAPIKey } from '../../secrets'
import WebFont from 'webfontloader'

// INITIAL STATE

const initialState = {
  fetching: false,
  fetched: false,
  fontList: {}
}

// ACTION TYPES

export const GET_FONTS = 'GET_FONTS'
// ACTION CREATORS

export function getFonts (fontList) {
  const action = {type: GET_FONTS, fontList}
  return action
}

// THUNKS

export function fetchFonts () {
  return function thunk (dispatch) {
    return axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleAPIKey}`)
      .then(res => res.data)
      .then(fonts => {
        let fontFamilies = fonts.items.filter((font, i) => {
          if (i > -1) {
            return font
          }
        }).map(font => {
          return font.family
        })
        WebFont.load({
          google: {
            families: fontFamilies
          }
        })
        return fonts
      })
      .then(payload => {
        const action = getFonts(payload)
        dispatch(action)
      })
      .catch(err => console.log(err))
  }
}

// REDUCERS

const rootFontReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FONTS:
      return Object.assign({}, state, {fontList: action.fontList})
    default:
      return state
  }
}

export default rootFontReducer
