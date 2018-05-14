import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFavorites} from '../reducers/favorites'
import store from '../store'
import {Spinner} from '../components'
import {Link} from 'react-router-dom'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import IconButton from 'material-ui/IconButton'
import { removeFavorite } from '../reducers/favorites'

class FavoritesList extends Component {
  constructor (props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove (value, e) {
    this.props.removeFavorite({id: value.id, family: value.family})
  }
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
              <div key={favorite.favoriteID} className='favoriteslist-div'>
                <Link to={`/font/${favorite.family}`} className='favoriteslist-map'>
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
                <IconButton className='favoriteslist-icon'
                  onClick={(e) => {
                    this.handleRemove({id: favorite.favoriteID, family: favorite.family}, e)
                  }}>
                  <ContentRemoveCircle className='favoriteslist-remove' disabled={this.props.disabledVal}/>
                </IconButton>
              </div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeFavorite: (favorite) => dispatch(removeFavorite(favorite))
  }
}

const containerFavoritesList = connect(mapStateToProps, mapDispatchToProps)(FavoritesList)
export default containerFavoritesList
