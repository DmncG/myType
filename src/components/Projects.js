import React, {Component} from 'react'
import {Navbar, ProjectsList} from '../components'
import {connect} from 'react-redux'
import {putProject, removeProject} from '../reducers/projects'

class Projects extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dirty: false,
      forDeletion: []}
  }

  render () {
    return (
      <div>
        <Navbar/>
        <p>you have reached react projects</p>
        <button>Add Project</button>
        <input type='text' name='Project Name'/>
        <button>Delete Project</button>
        <ProjectsList/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fontList: state.rootFontReducer.fontList,
    fetching: state.rootFontReducer.fetching,
    fetched: state.rootFontReducer.fetched,
    erred: state.rootFontReducer.erred
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProject: () => dispatch(putProject),
    deleteProject: (proj) => dispatch(removeProject)
  }
}

const containerProjects = connect(mapStateToProps, mapDispatchToProps)(Projects)
export default containerProjects
