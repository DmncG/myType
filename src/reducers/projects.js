import axios from 'axios'
import {allProjects} from '../aws-ops'
import { isFetching, isFetched, isErred } from './status'

// INITIAL STATE

const initialState = {
  projectsList: [],
  currentProject: []
}

// ACTION TYPES

export const GET_PROJECTS = 'GET_PROJECTS'
export const GET_ONEPROJECT = 'GET_ONEPROJECT'
export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

// ACTION CREATORS

export function getProjects (projectsList) {
  const action = {type: GET_PROJECTS, projectsList}
  return action
}

export function getOneProject (project) {
  const action = {type: GET_ONEPROJECT, project}
  return action
}

export function addProject (project) {
  const action = {type: ADD_PROJECT, project}
  return action
}

export function deleteProject (project) {
  const action = {type: DELETE_PROJECT, project}
  return action
}
// THUNKS

export function fetchProjects () {
  return function thunk (dispatch) {
    allProjects()
      .then(res => {
        dispatch(isFetching())
        return res
      })
      .then(payload => {
        let action = getProjects(payload)
        dispatch(action)
      })
      .then(dispatch(isFetched()))
      .catch(err => {
        console.error(err)
        dispatch(isErred())
      })
  }
}

export function fetchOneProject () {
  return function thunk (dispatch) {
    return axios.get('/api/projects/:projectID')
      .then(res => res.data)
      .then(project => {
        const action = getOneProject(project)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export function putProject (projectName) {
  return function thunk (dispatch) {
    return axios.post('/api/projects/add')
      .then(res => res.data)
      .then(project => {
        const action = addProject(project)
        dispatch(action)
      })
  }
}

export function removeProject () {
  return function thunk (dispatch) {
    return axios.delete('/api/projects/delete')
      .then(res => res.data)
      .then(project => {
        const action = deleteProject(project)
        dispatch(action)
      })
  }
}

// REDUCERS

const rootProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return Object.assign({}, state, {projectsList: action.projectsList})
    case GET_ONEPROJECT:
      return Object.assign({}, state, {currentProject: action.project})
    case ADD_PROJECT:
      return Object.assign({}, state, {projectList: [...state.projectList, action.project]})
    case DELETE_PROJECT:
      return Object.assign({}, state, {projectList: state.projectList.filter(proj => {
        if (proj !== action.project) {
          return proj
        }
      })})
    default:
      return state
  }
}

export default rootProjectReducer
