import React, { Component } from 'react'

import './Lab.css'

import InfoButtons from '../Main/InfoButtons/InfoButtons'
import Biomes from '../Main/Biome/Biomes'

class Lab extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='Lab'>
        {this.props.children}
        <div id="parameters">
          <InfoButtons 
            mapWidth={this.props.mapWidth}
            handleFixMapClick={this.props.handleFixMapClick}
            handleReRenderClick={this.props.handleReRenderClick}
            handleSaveClick={this.props.handleSaveClick}
          />

          <Biomes 
            handleAddBiomeClick={this.props.handleAddBiomeClick}
            handleBiomeInputChange={this.props.handleBiomeInputChange}
            biomes={this.props.biomes}
          />
        </div>
      </div>
    )
  }
}

export default Lab
