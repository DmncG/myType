import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFavorites} from '../reducers/favorites'
import store from '../store'
import {Spinner} from '../components'
import {Link} from 'react-router-dom'

class FavoritesList extends Component {
  componentDidMount () {
    let favoritesThunk = fetchFavorites()
    store.dispatch(favoritesThunk)
  }

  render () {
    const {favoritesList} = this.props
    return (
      <div className='favoriteslist-content'>
        {favoritesList.length
          ? favoritesList.map((favorite, i) => {
            return (
              <Link to={`/font/${favorite.family}`}key={favorite.favoriteID} className='favoriteslist-map'>
                <p className="font-glyph" style={{fontFamily: `${favorite.family}`}}>
                  {`${favorite.family[0].toUpperCase()}${favorite.family[0].toLowerCase()}`}
                </p>

                <p className="font-fam" style={{fontFamily: `${favorite.family}`}}>
                  {`${favorite.family}`}
                </p>
                {i !== favoritesList.length - 1
                  ? <div className="font-headerLine"></div>
                  : <div></div>
                }
              </Link>
            )
          })
          : <div style={{margin: 'auto'}}>You have no favorites </div>
        }
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
