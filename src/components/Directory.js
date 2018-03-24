import React, {Component} from 'react'
import {Navbar} from '../components'
import {connect} from 'react-redux'

const Directory = (props) => {
  const {fontList} = props
  console.log('thisisprops', fontList)
  return (
    <div>
      <Navbar/>
      <p>you have reached react directory</p>
      <ul>
        {
          fontList.items &&
            fontList.items.map(font => {
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
  console.log('thisisstate', state)
  return {
    fontList: state.rootFontReducer.fontList
  }
}

const directoryContainer = connect(mapStateToProps)(Directory)

export default directoryContainer
