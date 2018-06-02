import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch, Redirect} from 'react-router-dom'
import {Home, PageNotFound, Font, Search, Directory, Favorites, Signup} from '../components'
import {fetchFonts} from '../reducers/fonts'
import {fetchFavorites} from '../reducers/favorites'
import history from './history'
import store from '../store'
import {getSession} from '../reducers/user'

export default class Routes extends Component {
  componentDidMount () {
    const fontThunk = fetchFonts()
    const favesThunk = fetchFavorites()
    store.dispatch(fontThunk)
    // store.dispatch(favesThunk)
    store.dispatch(getSession())
  }

  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/font/:family" component={Font} />
          <Route path="/search" component={Search} />
          <Route path="/directory" component={Directory} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/error" component = {PageNotFound} />
          <Redirect to= "/error" component={PageNotFound} />
        </Switch>
      </Router>
    )
  }
}
