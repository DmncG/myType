import React, {Component} from 'react'
import {Navbar} from '../components'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {value: '', suggestions: []}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    e.preventDefault()
  }
  render () {
    const {fontList} = this.props
    const {value} = this.state

    return (
      <div>
        <Navbar/>
        {
          fontList.items &&
          <div className='search-content'>
            <TextField
              onChange={this.handleChange}
              value={value}
              underlineStyle={{borderColor: '#000000'}}
              id='search-textfield'
              placeholder='Search for your font'/>
            <p> Search Results</p>
            <ul style={{listStyleType: 'none'}} className="directory-ul">
              {value
                ? fontList.items.filter(font => {
                  if (font.family.toLowerCase().slice(0, value.length) === value.toLowerCase()) {
                    return font
                  }
                }).map(font => {
                  return (
                    <li key={font.family} className="directory-li">
                      <Link to={`/font/${font.family}`} className="directory-link">{font.family}</Link>
                    </li>
                  )
                })
                : fontList.items.map(font => {
                  return (
                    <li key={font.family} className="directory-li">
                      <Link to={`/font/${font.family}`} className="directory-link">{font.family}</Link>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fontList: state.rootFontReducer.fontList
  }
}

const containerSearch = connect(mapStateToProps)(Search)

export default containerSearch
