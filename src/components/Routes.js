import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch, Redirect} from 'react-router-dom'
import {Home, PageNotFound, Font, Search, Directory, Projects} from '../components'
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
          <Route path="/font/:id" component={Font} />
          <Route path="/search" component={Search} />
          <Route path="/directory" component={Directory} />
          <Route path="/projects" component={Projects} />
          <Route path="/error" component = {PageNotFound} />
          <Redirect to= "/error" component={PageNotFound} />
        </Switch>
      </Router>
    )
  }
}
