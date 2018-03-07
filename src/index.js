import React from 'react'
import ReactDOM from 'react-dom'
import {Routes, Navbar} from './components'
import './scss/style.scss'
import registerSW from './registerSW.js'
const App = () => (
  <div>
    <Navbar/>
    <Routes/>
  </div>
)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

registerSW()
