import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './components'
import './scss/style.scss'

const App = () => (
  <Routes/>
)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
