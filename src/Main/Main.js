import React, { Component } from 'react'

import Map from './Map/Map'
import Biomes from './Biome/Biomes'
import InfoButtons from './InfoButtons/InfoButtons'

import './Main.css'

class Main extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='Main'>
        <Map
          map={this.props.map}
          biomes={this.props.biomes}
          handleMapClick={() => this.props.handleMapClick()}
          concatenateMap={this.props.concatenateMap}
        />

        <InfoButtons
          mapWidth={this.props.mapWidth}
          handleFixMapClick={this.props.handleFixMapClick}
          handleReRenderClick={this.props.handleReRenderClick}
          handleSaveClick={this.props.handleSaveClick}
        />

        <Biomes
          handleAddBiomeClick={this.props.handleAddBiomeClick}
          biomes={this.props.biomes}
        />
      </div>
    )
  }
}

export default Main
