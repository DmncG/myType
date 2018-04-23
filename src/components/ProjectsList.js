import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProjects} from '../reducers/projects'
import store from '../store'

class ProjectsList extends Component {
  componentDidMount () {
    let projectsThunk = fetchProjects()
    store.dispatch(projectsThunk)
  }

  render () {
    const {projectsList} = this.props
    return (
      <div>
        <p>You have no projects</p>
        <ul>
          {projectsList.length &&
          projectsList.map(project => {
            return (
              <li key={project.projectID}>{`${project.projectID}, 
              ${project.fonts.family}, 
              ${project.fonts.category}, 
              ${project.fonts.variants} `}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectsList: state.rootProjectReducer.projectsList,
    fontList: state.rootFontReducer.fontList,
    fetching: state.rootFontReducer.fetching,
    fetched: state.rootFontReducer.fetched,
    erred: state.rootFontReducer.erred
  }
}

const containerProjectsList = connect(mapStateToProps)(ProjectsList)
export default containerProjectsList
