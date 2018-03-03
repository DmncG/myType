import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './components'
import './scss/style.scss'
import './service-worker.js'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('./service-worker.js')
    .then(function (registration) {
    // Successful registration
      console.log('Hooray. Registration successful, scope is:', registration.scope)
    }).catch(function (err) {
      // Failed registration, service worker won’t be installed
      console.log('Whoops. Service worker registration failed, error:', err)
    })
}

const App = () => (
  <Routes/>
)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
