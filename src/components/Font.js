import React, {Component} from 'react'
import {Navbar} from '../components'
import {connect} from 'react-redux'
import { fetchFont } from '../reducers/fonts'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'

class Font extends Component {
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
          this.props.font.length && fontDetails &&
          <div className="font-content">

            <section className='font-section-main'>

              <p className="font-glyph" style={{fontFamily: `${this.props.font}`}}>
                {`${this.props.font[0].toUpperCase()}${this.props.font[0].toLowerCase()}`}
              </p>

              <p className="font-fam" style={{fontFamily: `${this.props.font}`}}>
                {`${this.props.font}`}
              </p>

              <div className="font-headerLine"></div>
            </section>

            <section className="font-section-details">

              <p id="font-details-header">Details</p>

              <div className="font-details-headerLine"></div>

              <div>
                <p className="font-details" id="font-details-category">Category</p>

                <p className="font-category">
                  {`${fontDetails.filter(font => font.family === this.props.font)[0].category}`}
                </p>
              </div>

              <div>
                <p className="font-details" id="font-details-styles">Styles</p>

                {
                  fontDetails.filter(font => font.family === this.props.font)[0].variants
                    .map(variant => {
                      return (
                        <p key={`${variant}`} className="font-variant">
                          {`${variant}`}
                        </p>
                      )
                    })
                }
              </div>
            </section>
          </div>
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
