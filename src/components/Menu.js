import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import {Link} from 'react-router-dom'

/*

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

*/

export default class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false}
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleToggle () {
    this.setState(prevState => ({open: !prevState.open}))
  }

  handleClose () {
    this.setState(prevState => ({open: false}))
  }

  render () {
    return (
      <div>
        <NavigationMenu color={'#ffffff'} onClick={this.handleToggle} />
        <Drawer open={this.state.open} openSecondary={true} docked={false} onRequestChange={(open) => this.setState({open})}>
          <MenuItem><Link to='/home' style={{textDecoration: 'none', color: '#000000'}}>Home</Link></MenuItem>
          <MenuItem primaryText="Saved Fonts" />
          <MenuItem primaryText="Directory" />
          <MenuItem primaryText="Search" />
        </Drawer>
      </div>
    )
  }
}
