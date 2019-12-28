import React, { Component } from 'react'

import './InfoButtons.css'

class InfoButtons extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='InfoButtons'>

        <div className='label-container'>
          <label className='map-dimensions-label'>
                        Dimension
            <input id='map-dimensions' type='number' value={this.props.mapWidth} onChange={this.props.handleMapWidthChange} />
          </label>
        </div>

        <div className='button-container'>
          <button className='fixMapButton' onClick={this.props.handleFixMapClick}>fix map</button>
        </div>

        <div className='button-container'>
          <button className='saveButton' onClick={this.props.handleSaveClick}>save</button>
        </div>

        <div className='button-container'>
          <button className='reRenderButton' onClick={this.props.handleReRenderClick}>re-render</button>
        </div>

      </div>
    )
  }
}

export default InfoButtons
