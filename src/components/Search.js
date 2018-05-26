import React, {Component} from 'react'
import {Navbar} from '../components'
import TextField from 'material-ui/TextField'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Autosuggest from 'react-autosuggest'


class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {value: '', suggestions: []}
    this.handleChange = this.handleChange.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.getSuggestionvalue = this.getSuggestionValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSuggestionsFetchRequested (value) {
    let getSuggestions = (value) => {
      console.log({value})
      const languages = this.props.fontList.items.map(font => font.family)
      const inputVal = value.trim().toLowerCase()
      const inputLength = inputVal.length
      console.log({languages})
      return inputLength === 0 ? [] : languages.filter(lang => {
        return lang.toLowerCase().slice(0, inputLength) === inputVal
      })
    }
    this.setState({
      suggestions: getSuggestions(value.value)
    })
  }

  renderSuggestion (suggestion) {
    return (
      <div>
        {suggestion}
      </div>
    )
  }

  getSuggestionValue (suggestion) {
    return suggestion
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  onChange (event, { newValue }) {
    this.setState({
      value: newValue
    })
    event.preventDefault()
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    e.preventDefault()
  }
  render () {
    const {fontList} = this.props
    const {value, suggestions} = this.state

    const inputProps = {
      placeholder: 'Search for a font',
      value,
      onChange: this.onChange
    }

    return (
      <div>
        <Navbar/>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          theme={{padding: '100px'}}
        />
        {/* {
          fontList.items &&
          <div className='search-content'>
            <TextField
              onChange={this.handleChange}
              value={value}
              underlineStyle={{borderColor: '#000000'}}
              id='search-textfield'/>
            <p> Search Results</p>
            <ul style={{listStyleType: 'none'}} className="directory-ul">
              {this.state.suggestions.length
                ? fontList.items.filter(font => {
                  if (font.family === this.state.value) {
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
        } */}
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
