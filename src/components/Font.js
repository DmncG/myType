import React, {Component} from 'react'
import {Navbar} from '../components'
import {connect} from 'react-redux'
import { fetchFont } from '../reducers/fonts'

class Font extends Component {
  componentDidMount () {
    console.log('props in lifecycle', this.props)
    let params = this.props.match.params.family
    console.log('hit lifecycle')
    this.props.fetchFont(params)
  }

  render () {
    return (
      <div>
        <Navbar/>
        <p>you have reached the font:</p>
        <p style={{fontFamily: `${this.props.font}`}}> {`${this.props.font}`} </p>
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
