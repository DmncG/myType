import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './components'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './scss/style.scss'
import registerSW from './registerSW.js'

const App = () => (
  <MuiThemeProvider>
    <Routes/>
  </MuiThemeProvider>
)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

registerSW()
injectTapEventPlugin()
