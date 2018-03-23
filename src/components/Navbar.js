import React from 'react'
import AppBar from 'material-ui/AppBar'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import ActionSearch from 'material-ui/svg-icons/action/search'
import IconButton from 'material-ui/IconButton'
import {Menu} from '../components'

const Navbar = props => {
  return (
    <AppBar title="myType" iconElementRight={<Menu/>}
      iconElementLeft={<IconButton><ActionSearch/></IconButton>}
      style={{backgroundColor: '#000000'}}
      titleStyle={{textAlign: 'center'}}/>
  )
}

export default Navbar
