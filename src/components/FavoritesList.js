import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFavorites} from '../reducers/favorites'
import store from '../store'

class FavoritesList extends Component {
  componentDidMount () {
    let favoritesThunk = fetchFavorites()
    store.dispatch(favoritesThunk)
  }

  render () {
    const {favoritesList} = this.props
    return (
      <div>
        <p>You have no favorites</p>
        <ul>
          {favoritesList.length &&
          favoritesList.map(favorite => {
            return (
              <li key={favorite.favoriteID}>{`${favorite.favoriteID}, 
              ${favorite.fonts.family}, 
              ${favorite.fonts.category}, 
              ${favorite.fonts.styles} `}
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
    favoritesList: state.rootFavoritesReducer.favoritesList,
    fontList: state.rootFontReducer.fontList,
    fetching: state.rootFontReducer.fetching,
    fetched: state.rootFontReducer.fetched,
    erred: state.rootFontReducer.erred
  }
}

const containerFavoritesList = connect(mapStateToProps)(FavoritesList)
export default containerFavoritesList
