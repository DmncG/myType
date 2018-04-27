import React, {Component} from 'react'
import {Navbar, Spinner, PageNotFound} from '../components'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Directory = (props) => {
  const {fontList, fetching, fetched, erred} = props
  return (
    <div className='directory-div'>
      <Navbar/>
      {
        fetching && !fetched
          ? <Spinner/>
          : erred
            ? <PageNotFound/>
            : <ul style={{listStyleType: 'none'}} className="directory-ul">
              { fontList.items &&
                fontList.items.map((font, i) => {
                  return (
                    <li key={font.family} className="directory-li" style={{fontFamily: `${font.family}`}}>
                      <Link to={`/font/${font.family}`} className="directory-link">{font.family}</Link>
                    </li>
                  )
                })
              }
            </ul>
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    fontList: state.rootFontReducer.fontList,
    fetching: state.rootStatusReducer.fetching,
    fetched: state.rootStatusReducer.fetched,
    erred: state.rootStatusReducer.erred
  }
}

const containerDirectory = connect(mapStateToProps)(Directory)

export default containerDirectory
