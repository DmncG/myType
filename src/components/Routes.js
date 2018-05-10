import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch, Redirect} from 'react-router-dom'
import {Home, PageNotFound, Font, Search, Directory, Favorites} from '../components'
import {fetchFonts} from '../reducers/fonts'
import history from './history'
import store from '../store'

export default class Routes extends Component {
  componentDidMount () {
    const fontThunk = fetchFonts()
    store.dispatch(fontThunk)
  }

  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
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
