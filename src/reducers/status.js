// INITIAL STATE
const initialState = {
  fetching: false,
  fetched: false,
  erred: false
}

// ACTION TYPES
export const FETCHING = 'FETCHING'
export const FETCHED = 'FETCHED'
export const ERRED = 'ERRED'

// ACTION CREATORS

export function isFetching () {
  const action = {type: FETCHING}
  return action
}

export function isFetched () {
  const action = {type: FETCHED}
  return action
}

export function isErred () {
  const action = {type: FETCHED}
  return action
}

// REDUCERS

const rootStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, {fetching: true})
    case FETCHED:
      return Object.assign({}, state, {fetching: false, fetched: true})
    case ERRED:
      return Object.assign({}, state, {erred: true})
    default:
      return state
  }
}

export default rootStatusReducer
