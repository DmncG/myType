import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './components'
import './scss/style.scss'

(() => {
  console.log('hit function')
  if ('serviceWorker' in navigator) {
    console.log('hit conditional')
    navigator.serviceWorker.register('../public/service-worker.js')
      .then(function (registration) {
      // Successful registration
        console.log('Hooray. Registration successful, scope is:', registration.scope)
      }).catch(function (err) {
      // Failed registration, service worker won’t be installed
        console.log('Whoops. Service worker registration failed, error:', err)
      })
  }
})()

const App = () => (
  <Routes/>
)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
