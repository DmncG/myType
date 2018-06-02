import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import {Link} from 'react-router-dom'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import {connect} from 'react-redux'
import store from '../store'
import {removeFaveFromMenu} from '../reducers/favorites'
import {removeSessionFromState, signOutTheUser} from '../reducers/user'

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleToggle () {
    this.setState(prevState => ({open: !prevState.open}))
  }

  handleClose () {
    this.setState(prevState => ({open: false}))
  }

  handleSignOut (e) {
    let action = signOutTheUser()
    store.dispatch(action)
    this.setState(prevState => ({open: !prevState.open}))
  }

  render () {
    const {userSession} = this.props
    return (
      <div>
        <NavigationMenu id="menu-burger" color={'#ffffff'} onClick={this.handleToggle} />
        <Drawer open={this.state.open} openSecondary={true} docked={false} onRequestChange={(open) => this.setState({open})}>
          <NavigationClose id="menu-closeIcon" onClick={this.handleToggle}/>
          <MenuItem><Link to='/' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Home</Link></MenuItem>
          <MenuItem><Link to='/directory' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Directory</Link></MenuItem>
          {
            userSession.username &&
            <MenuItem><Link to='/favorites' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Favorites</Link></MenuItem>
          }
          <MenuItem><Link to='/search' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Search</Link></MenuItem>
          {
            userSession.username
              ? <MenuItem onClick={this.handleSignOut} className="menu-menuItem">Log out</MenuItem>
              : <MenuItem><Link to='/signup' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Login or Signup</Link></MenuItem>
          }
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userSession: state.rootUserReducer.session
  }
}

const containerMenu = connect(mapStateToProps)(Menu)

export default containerMenu
