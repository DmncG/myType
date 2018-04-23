import React from 'react'
import {Navbar, Spinner} from '../components'
import {connect} from 'react-redux'
const Home = props => {
  const {fetched} = props
  return (
    fetched
      ? <div className="home">
        <Navbar/>
        <p className="home-header">myType.</p>
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
