import React, {Component} from 'react'
import {Route, Router} from 'react-router'
import {Switch, Redirect} from 'react-router-dom'
import {Home, PageNotFound, Font, Search} from '../components'
import history from './history'

const Routes = props => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/font" component={Font} />
        <Route path="/search" component={Search} />
        <Route path="/error" component = {PageNotFound} />
        <Redirect to= "/error" component={PageNotFound} />
      </Switch>
    </Router>
  )
}

export default Routes
