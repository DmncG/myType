import React, {Component} from 'react'
import {Navbar, FavoritesList} from '../components'
import {connect} from 'react-redux'
import {putProject, removeProject} from '../reducers/projects'

class Favorites extends Component {
  constructor (props) {
    super(props)
    this.state = {disabled: true}
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleEdit () {
    let done = document.getElementsByClassName('favorites-done')
    let removeFave = document.getElementsByClassName('favoriteslist-remove')
    console.log('handleDone attr', done)
    done[0].classList.add('active-done')
    removeFave[0].classList.add('active-remove')
    this.setState({disabled: false})
  }

  handleDone () {
    let done = document.getElementsByClassName('favorites-done')
    let removeFave = document.getElementsByClassName('favoriteslist-remove')
    console.log('handleDone clicked', done)
    removeFave[0].classList.remove('active-remove')
    done[0].classList.remove('active-done')
    this.setState({disabled: true})
  }

  render () {
    return (
      <div>
        <Navbar/>
        <div className='favorites-buttons'>
          <button className='favorites-edit' onClick={this.handleEdit}>Edit</button>
          <button className='favorites-done' onClick={this.handleDone} disabled={this.state.disabled}>Done</button>
        </div>
        <p id='favorites-header'>Favorites</p>
        <div id='favorites-headerLine'></div>
        <FavoritesList disabledVal={this.state.disabled}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favoritesList: state.rootFavoritesReducer.favoritesList,
    fontList: state.rootFontReducer.fontList,
    fetching: state.rootFontReducer.fetching,
    fetched: state.rootFontReducer.fetched,
    erred: state.rootFontReducer.erred
  }
}

const containerFavorites = connect(mapStateToProps)(Favorites)
export default containerFavorites
