import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Drawer from 'material-ui/Drawer'
import {Link} from 'react-router-dom'

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
          <MenuItem><Link to='/directory' style={{textDecoration: 'none', color: '#000000'}}>Directory</Link></MenuItem>
          <MenuItem><Link to='/projects' style={{textDecoration: 'none', color: '#000000'}}>Projects *coming soon*</Link></MenuItem>
          <MenuItem><Link to='/search' style={{textDecoration: 'none', color: '#000000'}}>Search</Link></MenuItem>
        </Drawer>
      </div>
    )
  }
}
