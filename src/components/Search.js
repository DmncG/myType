import React, {Component} from 'react'
import {Navbar} from '../components'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {value: 'Search for your font'}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    e.preventDefault()
  }
  render () {
    const {fontList} = this.props
    return (
      <div>
        <Navbar/>
        {
          fontList.items &&
          <div className='search-content'>
            <TextField
              onChange={this.handleChange}
              value={this.state.value}
              underlineStyle={{borderColor: '#000000'}}
              id='search-textfield'/>
            <p> Search Results</p>
            <ul style={{listStyleType: 'none'}} className="directory-ul">
              {
                fontList.items.filter(font => {
                  if (font.family === this.state.value) {
                    return font
                  }
                }).map(font => {
                  return (
                    <li key={font.family} className="directory-li" style={{fontFamily: `${font.family}`}}>
                      <Link to={`/font/${font.family}`} className="directory-link">{font.family}</Link>
                    </li>
                  )

                  // if (font.family.match(/{`${this.state.value}`}/gi)) {
                  //   console.log('matches')
                  //   return (
                  //     <li key={font.family} className="directory-li" style={{fontFamily: `${font.family}`}}>
                  //       <Link to={`/font/${font.family}`} className="directory-link">{font.family}</Link>
                  //     </li>
                  //   )
                  // }
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
