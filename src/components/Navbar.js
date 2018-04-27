import React from 'react'
import AppBar from 'material-ui/AppBar'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import ActionSearch from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton'
import {Menu} from '../components'
import {Link} from 'react-router-dom'

const Navbar = props => {
  return (
    <AppBar title={<Link to='/home'
      id="navbar-title"
      style={{textDecoration: 'none', color: '#ffffff'}}>
      myType.</Link>} iconElementRight={<Menu/>}
    iconElementLeft={<IconButton><ActionSearch id="navbar-search"/></IconButton>}
    style={{backgroundColor: '#000000'}}
    titleStyle={{textAlign: 'center'}}/>
  )
}

export default Navbar
