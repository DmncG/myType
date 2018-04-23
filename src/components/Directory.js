import React, {Component} from 'react'
import {Navbar, Spinner, PageNotFound} from '../components'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Directory = (props) => {
  const {fontList, fetching, fetched, erred} = props
  console.log('fontList', fontList)
  return (
    <div className='directory-div'>
      <Navbar/>
      <p>you have reached react directory</p>
      {
        fetching && !fetched
          ? <Spinner/>
          : erred
            ? <PageNotFound/>
            : <ul style={{listStyleType: 'none'}} className="directory-ul">
              { fontList.items &&
                fontList.items.map((font, i) => {
                  return (
                    <li key={font.family} className="directory-li" style={{fontFamily: `${font.family}`, fontSize: '50px'}}>
                      <Link to={`/font/${font.family}`} style={{textDecoration: 'none', color: '#000000'}}>{font.family}</Link>
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
  console.log('state***', state.rootFontReducer)
  return {
    fontList: state.rootFontReducer.fontList,
    fetching: state.rootStatusReducer.fetching,
    fetched: state.rootStatusReducer.fetched,
    erred: state.rootStatusReducer.erred
  }
}

const containerDirectory = connect(mapStateToProps)(Directory)

export default containerDirectory
