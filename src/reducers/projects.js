import axios from 'axios'

// INITIAL STATE

const initialState = {
  projectList: {}
}

// ACTION TYPES

export const GET_PROJECTS = 'GET_PROJECTS'

// ACTION CREATORS

export function getProjects (projectsList) {
  const action = {type: GET_PROJECTS, projectsList}
  return action
}
// THUNKS

export function fetchProjects () {
  return function thunk (dispatch) {
    return axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${googleAPIKey}`)
      .then(res => res.data)
      .then(projects => {
        const action = getProjects(projects)
        dispatch(action)
      })
      .catch(err => console.log(err))
  }
}

// REDUCERS

const rootProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return Object.assign({}, state, {projectList: action.projectList})
    default:
      return state
  }
}

export default rootProjectReducer
