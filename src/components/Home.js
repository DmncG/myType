import React from 'react'
import {Navbar, Spinner} from '../components'
import {connect} from 'react-redux'
const Home = props => {
  const {fetched} = props
  return (
    fetched
      ? <div className="home">
        <Navbar/>
        <p id="home-header">myType.</p>
        <div id="home-headerBorder"></div>
      </div>
      : <Spinner/>
  )
}

const mapStateToProps = (state, OwnProps) => {
  return {
    fetched: state.rootStatusReducer.fetched
  }
}
const containerHome = connect(mapStateToProps)(Home)
export default containerHome
