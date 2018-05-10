import React, {Component} from 'react'
import {Navbar, FavoritesList} from '../components'
import {connect} from 'react-redux'
import {putProject, removeProject} from '../reducers/projects'

class Favorites extends Component {
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
        <p>you have reached react favorites</p>
        <FavoritesList/>
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

const containerFavorites = connect(mapStateToProps, mapDispatchToProps)(Favorites)
export default containerFavorites
