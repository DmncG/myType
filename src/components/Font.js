import React, {Component} from 'react'
import {Navbar, Spinner} from '../components'
import {connect} from 'react-redux'
import { fetchFont } from '../reducers/fonts'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'

class Font extends Component {
  constructor (props) {
    super(props)
    this.state = {style: 'Style', text: '', slider: 16}
    this.handleChange = this.handleChange.bind(this)
    this.handleSlider = this.handleSlider.bind(this)
  }
  handleChange (e, i, style) {
    this.setState({style})
  }

  handleSlider (e, slider) {
    this.setState({slider})
  }

  componentDidMount () {
    let params = this.props.match.params.family
    this.props.fetchFont(params)
  }

  render () {
    const fontDetails = this.props.fontList.items
    return (
      <div>
        <Navbar/>
        <ContentAddCircle className="font-add"/>
        <ActionFavorite className="font-favorite"/>
        {
          this.props.font.length && fontDetails
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
                <SelectField floatingLabelText="Styles"
                  value={this.state.style}
                  onChange={this.handleChange}
                  iconStyle={{fill: '#000000'}}
                  underlineStyle={{borderColor: '#000000'}}
                  selectedMenuItemStyle={{color: '#000000', opacity: '.4'}}
                  floatingLabelStyle={{fontFamily: 'Montserrat, sans-serif', fontWeight: '600', color: '#000000', left: '110px'}}>
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
                <TextField className="font-textfield" underlineStyle={{borderColor: '#000000'}} hintText="Type here to preview your font" fullWidth={true}/>
                <p className="font-slider-size"> {`${this.state.slider} px`} </p>
                <Slider className= "font-slider" min={0} max={256} step={1} value={this.state.slider} onChange={this.handleSlider} />
              </div>
            </div> : <Spinner />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fontList: state.rootFontReducer.fontList,
    font: state.rootFontReducer.font
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFont: (params) => dispatch(fetchFont(params))
  }
}

const containerFont = connect(mapStateToProps, mapDispatchToProps)(Font)
export default containerFont
