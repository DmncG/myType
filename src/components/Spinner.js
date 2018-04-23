import React from 'react'

const Spinner = props => {
  return (
    <div className="loader">
      <svg viewBox="0 0 32 32" width="64" height="64">
        <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
      </svg>
    </div>
  )
}

export default Spinner
