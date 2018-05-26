import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import {Link} from 'react-router-dom'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

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
        <NavigationMenu id="menu-burger" color={'#ffffff'} onClick={this.handleToggle} />
        <Drawer open={this.state.open} openSecondary={true} docked={false} onRequestChange={(open) => this.setState({open})}>
          <NavigationClose id="menu-closeIcon" onClick={this.handleToggle}/>
          <MenuItem><Link to='/' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Home</Link></MenuItem>
          <MenuItem><Link to='/directory' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Directory</Link></MenuItem>
          <MenuItem><Link to='/favorites' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Favorites</Link></MenuItem>
          <MenuItem><Link to='/search' className="menu-menuItem" style={{textDecoration: 'none', color: '#000000'}}>Search</Link></MenuItem>
        </Drawer>
      </div>
    )
  }
}
