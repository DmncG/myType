import React, {Component} from 'react'
import {Navbar, Spinner} from '../components'
import {connect} from 'react-redux'
import { fetchFont } from '../reducers/fonts'
import { putFavorite } from '../reducers/favorites'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Slider from 'material-ui/Slider'

class Font extends Component {
  constructor (props) {
    super(props)
    this.state = {style: 'normal',
      variant: '',
      value: 'Type here to preview your font',
      weight: 'normal',
      slider: 25,
      faveToggle: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSlider = this.handleSlider.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleFave = this.handleFave.bind(this)
  }

  handleFave (e, i, fave) {
    let fontItems = this.props.fontList.items
    let params = this.props.match.params.family
    let index = null
    fontItems.forEach((font, i) => {
      if (font.family === params) {
        index = i
      }
    })
    let faveIcon = document.getElementsByClassName('font-favorite')
    faveIcon[0].classList.toggle('active')
    this.setState(prevState => ({faveToggle: !prevState.faveToggle}))
    this.props.putFavorite({id: index, family: params})
  }

  handleChange (e, i, style) {
    this.setState({variant: style})

    let match = `${style}`.match(/[0-9]{3}italic/gi)
    if (match) {
      console.log('match', match[0].slice(0, 3), match[0].slice(3))
      this.setState({weight: match[0].slice(0, 3), style: match[0].slice(3)})
    } else {
      if (style === 'regular') {
        this.setState({weight: 'normal', style: 'normal'})
      } else if (style === 'italic') {
        this.setState({weight: 'normal', style: 'italic'})
      } else {
        this.setState({weight: style, style: 'normal'})
      }
    }
  }

  handleChangeText (e, i, value) {
    this.setState({value: e.target.value})
    e.preventDefault()
  }

  handleSlider (e, slider) {
    this.setState({slider})
  }

  componentDidMount () {
    let params = this.props.match.params.family
    this.props.fetchFont(params)
  }

  componentDidUpdate () {
    let params = this.props.match.params.family
    console.log('favorites', this.props.favoritesList)
    this.props.favoritesList.forEach(favorite => {
      if (favorite.family === params) {
        if (!this.state.faveToggle) {
          this.setState(prevState => ({faveToggle: !prevState.faveToggle}))
          console.log('hittogglecondition', this.state.faveToggle)
          let faveIcon = document.getElementsByClassName('font-favorite')
          faveIcon[0].classList.toggle('active')
        }
      }
    })
  }

  render () {
    const fontDetails = this.props.fontList.items
    return (
      <div>
        <Navbar/>
        {this.props.font.length &&
        fontDetails && <ActionFavorite className="font-favorite" onClick={this.handleFave}/>}
        {
          this.props.font.length && fontDetails.length
            ? <div className="font-content">

              <p className="font-glyph" style={{fontFamily: `${this.props.font}`}}>
                {`${this.props.font[0].toUpperCase()}${this.props.font[0].toLowerCase()}`}
              </p>

              <p className="font-fam" style={{fontFamily: `${this.props.font}`}}>
                {`${this.props.font}`}
              </p>

              <div className="font-headerLine"></div>

              <p id="font-details-header">Details</p>

              <div className="font-details-headerLine"></div>

              <div className="font-categories">
                <p id="font-category-header">Category</p>

                <p className="font-category-item">
                  {`${fontDetails.filter(font => font.family === this.props.font)[0].category}`}
                </p>

              </div>

              <div className="font-details-headerLine"></div>

              <div className="font-styles">
                <SelectField floatingLabelText="Style"
                  value={this.state.variant}
                  onChange={this.handleChange}
                  iconStyle={{fill: '#000000'}}
                  underlineStyle={{borderColor: '#000000'}}
                  selectedMenuItemStyle={{color: '#000000', opacity: '.4'}}
                  floatingLabelFixed={true}
                  floatingLabelStyle={{fontFamily: 'Montserrat, sans-serif', fontWeight: '600', color: '#000000', top: '20px', left: '110px', transition: 'none', transformOrigin: '50% 50% 0'}}>
                  {
                    fontDetails.filter(font => font.family === this.props.font)[0].variants
                      .map(variant => {
                        return (
                          <MenuItem value={`${variant}`}key={`${variant}`} primaryText={`${variant}`} />
                        )
                      })
                  }
                </SelectField>
              </div>
              <div className="font-preview">
                <div className="font-slider-items">
                  <p className="font-slider-size"> {`${this.state.slider} px`} </p>
                  <Slider className= "font-slider" sliderStyle={{margin: '0'}} min={0} max={100} step={1} value={this.state.slider} onChange={this.handleSlider} />
                </div>
                <textarea className="font-textarea"
                  style={{fontFamily: this.props.font, fontWeight: this.state.weight, fontStyle: this.state.style, fontSize: `${this.state.slider}px`}}
                  value={this.state.value}
                  onChange={this.handleChangeText}>
                </textarea>
              </div>
            </div> : <Spinner />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favoritesList: state.rootFavoritesReducer.favoritesList,
    fontList: state.rootFontReducer.fontList,
    font: state.rootFontReducer.font
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFont: (params) => dispatch(fetchFont(params)),
    putFavorite: (favorite) => dispatch(putFavorite(favorite))
  }
}

const containerFont = connect(mapStateToProps, mapDispatchToProps)(Font)
export default containerFont
