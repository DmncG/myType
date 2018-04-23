import axios from 'axios'
// import { googleAPIKey } from '../../secrets'
import WebFont from 'webfontloader'
import {isFetching, isFetched, isErred} from './status'
// INITIAL STATE

const initialState = {
  fontList: {},
  font: {}
}

// ACTION TYPES

export const GET_FONTS = 'GET_FONTS'
export const GET_FONT = 'GET_FONT'

// ACTION CREATORS

export function getFonts (fontList) {
  const action = {type: GET_FONTS, fontList}
  return action
}

export function getFont (font) {
  const action = {type: GET_FONT, font}
  return action
}

// THUNKS

export function fetchFonts () {
  return function thunk (dispatch) {
    return axios.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB8NI4X5jkNZbHN3q9gS8onLUK1Md-HWwo')
      .then(res => {
        return res.data
      })
      .then(fonts => {
        let fontFamilies = fonts.items.map(font => font.family)
        // https://fonts.googleapis.com/css?family=Inconsolata&text=Hello
        const action = getFonts(fonts)
        dispatch(action)
        return fontFamilies
      })
      .then(payload => {
        WebFont.load({
          loading: () => dispatch(isFetching()),
          google: {
            families: payload
          }
        })
      })
      .then(() => {
        return setTimeout(() => dispatch(isFetched()), 6000)
      })
      .catch(err => {
        console.log(err)
        dispatch(isErred())
      })
  }
}

export function fetchFont (font) {
  return function thunk (dispatch) {
    WebFont.load({
      google: {
        families: [font]
      }
    })
    dispatch(getFont(font))
  }
}

// REDUCERS

const rootFontReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FONTS:
      return Object.assign({}, state, {fontList: action.fontList})
    case GET_FONT:
      return Object.assign({}, state, {font: action.font})
    default:
      return state
  }
}

export default rootFontReducer
