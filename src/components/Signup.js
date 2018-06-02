import React, {Component} from 'react'
import {Navbar, MyTheme} from '../components'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Authenticator, withAuthenticator, SignIn, SignUp, ConfirmSignUp, Greetings} from 'aws-amplify-react'
import {getSession} from '../reducers/user'
import {removeFaveFromMenu} from '../reducers/favorites'
import {removeSessionFromState} from '../reducers/user'
import store from '../store'
import { ForgotPassword } from 'aws-amplify-react/dist/Auth';

export default class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {session: 'signIn'}
    this.handleChange = this.handleChange.bind(this)
    this.handlePW = this.handlePW.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value, dirty: true})
    e.preventDefault()
  }

  handlePW (e) {
    this.setState({pw: e.target.value, dirtyPW: true})
    e.preventDefault()
  }

  handleAuthStateChange (status) {
    console.log('thisistheAuthState', status)
    if (status === 'signedIn') {
      store.dispatch(getSession())
    }
    // if (status === 'signIn') {
    //   store.dispatch(removeFaveFromMenu())
    //   store.dispatch(removeSessionFromState())
    // }
  }

  render () {
    const {fontList} = this.props
    const {value, pw} = this.state
    const federated = {google_client_id: '706486668672-k5l2evhdi7i0qpdp48dinr12k24lfbh2.apps.googleusercontent.com', facebook_app_id: '1985585061770791'}

    return (
      <div>
        <Navbar/>
        <Authenticator hideDefault={true} onStateChange={this.handleAuthStateChange} theme={MyTheme}>
          <SignIn federated={federated}/>
          <SignUp/>
          <ForgotPassword/>
          <ConfirmSignUp/>
          <Greetings/>
        </Authenticator>
      </div>
    )
  }
}
