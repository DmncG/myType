import React, {Component} from 'react'
import {Navbar} from '../components'
import {connect} from 'react-redux'

const Directory = (props) => {
  const {fontList} = props
  return (
    <div>
      <Navbar/>
      <p>you have reached react directory</p>
      <ul>
        {
          fontList.items &&
            fontList.items.map((font, i) => {
              if (i > -1) {
                return (
                  <li key={font.family} style={{fontFamily: `${font.family}`}}>{font.family}</li>
                )
              }
              return (
                <li key={font.family}>{font.family}</li>
              )
            })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    fontList: state.rootFontReducer.fontList
  }
}

const directoryContainer = connect(mapStateToProps)(Directory)

export default directoryContainer
