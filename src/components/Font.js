import React, {Component} from 'react'
import {Navbar} from '../components'
import {connect} from 'react-redux'
import { fetchFont } from '../reducers/fonts'
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle'

class Font extends Component {
  componentDidMount () {
    let params = this.props.match.params.family
    this.props.fetchFont(params)
  }

  render () {
    return (
      <div>
        <Navbar/>
        {
          this.props.font[0] &&
          <div className="font-content">
            <ContentAddCircle className="font-add"/>
            <p className="font-glyph" style={{fontFamily: `${this.props.font}`}}>
              {`${this.props.font[0].toUpperCase()}${this.props.font[0].toLowerCase()}`}
            </p>
            <p className="font-fam" style={{fontFamily: `${this.props.font}`}}>
              {`${this.props.font}`}
            </p>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('fontListFont', state.rootFontReducer.fontList)
  return {
    fontList: state.rootFontReducer.fontList,
    font: state.rootFontReducer.font
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('ownProps****HEY', ownProps)
  return {
    fetchFont: (params) => dispatch(fetchFont(params))
  }
}

const containerFont = connect(mapStateToProps, mapDispatchToProps)(Font)
export default containerFont
