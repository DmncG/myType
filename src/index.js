import React from 'react'
import ReactDOM from 'react-dom'
import {Routes} from './components'
import { Provider } from 'react-redux'
import store from './store'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './scss/style.scss'
import registerSW from './registerSW.js'
import Amplify from 'aws-amplify'

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Routes/>
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)

registerSW()
injectTapEventPlugin()

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:1c4f6696-dbca-4dc6-a7f9-3599c2ee3b9f',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_fDnp3bgBA',
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: '4dkjmpdn06imb43q8mujh3c417'
  }
})
