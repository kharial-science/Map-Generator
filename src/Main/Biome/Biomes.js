import React, { Component } from 'react'

import BiomeSelector from './BiomeSelector'

import './Biome.css'

class Biomes extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let biomeKey = -1
    const biomeComponentArray = Array.from(this.props.biomes).map(biome => {
      biomeKey++
      return <BiomeSelector key={biomeKey} name={biome.name} color={biome.color} number={biome.number} />
    })

    return (
      <div id='Biomes'>
        {biomeComponentArray}
        <div className='button-container'>
          <button onClick={this.props.handleAddBiomeClick}>Add a biome</button>
        </div>
      </div>
    )
  }
}

export default Biomes
