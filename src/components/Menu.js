import React from 'react'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import {Link} from 'react-router-dom'
const Menu = props => {
  return (
    <IconMenu
      iconButtonElement={<IconButton><NavigationMenu color={'#ffffff'} />}/></IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}>
      <MenuItem><Link to='/home' style={{textDecoration: 'none', color: '#000000'}}>Home</Link></MenuItem>
      <MenuItem primaryText="Saved Fonts" />
      <MenuItem primaryText="Directory" />
      <MenuItem primaryText="Search" />
    </IconMenu>
  )
}
export default Menu