import React, {Component} from 'react'
import {Navbar} from '../components'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Authenticator, withAuthenticator, SignIn, SignUp, ConfirmSignUp, Greetings} from 'aws-amplify-react'
import {getSession} from '../reducers/user'
import {removeFaveFromMenu} from '../reducers/favorites'
import {removeSessionFromState} from '../reducers/user'
import store from '../store'

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
    if (status === 'signIn') {
      store.dispatch(removeFaveFromMenu())
      store.dispatch(removeSessionFromState())
    }
  }

  render () {
    const {fontList} = this.props
    const {value, pw} = this.state
    const federated = {google_client_id: '', facebook_app_id: ''}
    const AlwaysOn = (props) => {
      console.log('authData', props.authData)
      return (
        <div>
          <div>I am always here to show current auth state: {props.authState}</div>
          <button onClick={() => props.onStateChange('signUp')}>Show Sign Up</button>
        </div>
      )
    }

    return (
      <div>
        <Navbar/>
        <Authenticator hideDefault={true} onStateChange={this.handleAuthStateChange}>
          <SignIn/>
          <SignUp/>
          <ConfirmSignUp/>
          <Greetings/>
          <AlwaysOn/>
        </Authenticator>
      </div>
    )
  }
}
