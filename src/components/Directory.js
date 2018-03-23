import React, {Component} from 'react'
import {Navbar} from '../components'
import {connect} from 'react-redux'

const Directory = props => {
  console.log('props***', props)
  return (
    <div>
      <Navbar/>
      <p>you have reached react directory</p>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('**mapstatepropsFontList', state)
  return {
    fontList: state.fontList
  }
}

const directoryContainer = connect(mapStateToProps)(Directory)

export default directoryContainer
