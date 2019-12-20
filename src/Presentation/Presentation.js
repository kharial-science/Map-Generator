import React, { Component } from 'react'

import './Presentation.css'

class Presentation extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='Presentation'>
        <div className='header-container'>
          <header>
            <h1>Map Generator</h1>
            <p>Kharoh Family Science Map Generator prototype, later usage in generating Kharoh Families' maps</p>
          </header>
        </div>

      </div>
    )
  }
}

export default Presentation
