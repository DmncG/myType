import React, {Component} from 'react'
import {Navbar, FavoritesList} from '../components'
import {connect} from 'react-redux'
import {putProject, removeProject} from '../reducers/projects'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'

class Favorites extends Component {
  constructor (props) {
    super(props)
    this.state = {disabled: true, visible: 'hidden'}
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  handleBack (e) {
    let goBack = this.props.history.goBack
    goBack()
  }

  handleEdit () {
    let done = document.getElementsByClassName('favorites-done')
    let removeFave = document.getElementsByClassName('favoriteslist-remove')
    done[0].classList.add('active-done')
    if (removeFave.length) {
      removeFave[0].classList.add('active-remove')
    }
    this.setState({disabled: false, visible: 'visibile'})
  }

  handleDone () {
    let done = document.getElementsByClassName('favorites-done')
    let removeFave = document.getElementsByClassName('favoriteslist-remove')
    console.log('handleDone clicked', done, removeFave)
    if (removeFave.length) {
      removeFave[0].classList.remove('active-remove')
    }
    done[0].classList.remove('active-done')
    this.setState({disabled: true, visible: 'hidden'})
  }

  render () {
    return (
      <div>
        <Navbar/>
        <NavigationArrowBack className="icon-arrowback" onClick={this.handleBack}/>
        <div className='favorites-buttons'>
          <button className='favorites-edit' onClick={this.handleEdit}>Edit</button>
          <button className='favorites-done' onClick={this.handleDone} disabled={this.state.disabled}>Done</button>
        </div>
        <p id='favorites-header'>Favorites</p>
        <div id='favorites-headerLine'></div>
        <FavoritesList disabledVal={this.state.disabled} visible={this.state.visible}/>
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
