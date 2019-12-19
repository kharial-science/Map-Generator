import React, { Component } from 'react'

import './App.css'

import Map from './Map/Map'
import BiomeSelector from './Biome/BiomeSelector'

import { generate, expand, fix } from './lib/generator'
import download from './lib/download'
import createAvailableBiomesArray from './lib/createAvailableBiomesArray.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mapWidth: 40,
      map: generate(this.mapWidth, 'map'),
      biomes: [{ name: 'ocean', color: '#add8e6', number: 3 }, { name: 'plains', color: '#90ee90', number: 2 }]
    }

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleReRenderClick = this.handleReRenderClick.bind(this)
    this.handleAddBiomeClick = this.handleAddBiomeClick.bind(this)
    this.handleFixMapClick = this.handleFixMapClick.bind(this)
  }

  handleAddBiomeClick () {
    const newBiomeList = [...this.state.biomes]
    newBiomeList.push({ name: 'nom', color: 'couleur', number: 0 })
    this.setState({ biomes: newBiomeList })
  }

  handleMapClick () {
    this.setState({ map: expand(this.state.map) })
  }

  handleFixMapClick () {
    this.setState({ map: fix(this.state.map) })
  }

  handleSaveClick () {
    download(`Map (${this.state.mapWidth})`, this.state.map, document)
  }

  handleReRenderClick () {
    const newBiomeList = []
    Array.from(document.getElementsByClassName('biome-selector')).forEach(biomeSelector => {
      newBiomeList.push({
        name: biomeSelector.getElementsByClassName('biome-name-input')[0].value,
        color: biomeSelector.getElementsByClassName('biome-color-input')[0].value,
        number: biomeSelector.getElementsByClassName('biome-number-input')[0].value
      })
    })

    this.setState({
      mapWidth: parseInt(document.getElementById('map-dimensions').value, 10),
      biomes: newBiomeList
    },
    () => {
      console.log()
      this.setState({
        map: generate(this.state.mapWidth, 'map', createAvailableBiomesArray(this.state.biomes))
      })
    })
  }

  render () {
    let biomeKey = -1
    const biomeComponentArray = Array.from(this.state.biomes).map(biome => {
      biomeKey++
      return <BiomeSelector key={biomeKey} name={biome.name} color={biome.color} number={biome.number} />
    })

    return (
      <div className='main-grid'>

        <div className='header'>
          <h1>Map Generator</h1>
          <p>Kharoh Family Science Map Generator prototype, later usage in generating Kharoh Families' maps</p>
        </div>

        <Map
          map={this.state.map}
          biomes={this.state.biomes}
          onClick={() => this.handleMapClick()}
        />

        <div className='map-infos'>

          <div className='label-container'>
            <label className='map-dimensions-label'>
                              Dimension
              <input id='map-dimensions' type='number' defaultValue={this.state.mapWidth}/* value={this.state.mapWidth} onChange={this.handleMapWidthChange} */ />
            </label>
          </div>

          <div className='button-container'>
            <button className='fixMapButton' onClick={this.handleFixMapClick}>fix map</button>
          </div>

          <div className='button-container'>
            <button className='saveButton' onClick={this.handleSaveClick}>save</button>
          </div>

          <div className='button-container'>
            <button className='reRenderButton' onClick={this.handleReRenderClick}>re-render</button>
          </div>

        </div>

        <div className='map-biomes'>
          {biomeComponentArray}
          <div className='button-container'>
            <button onClick={this.handleAddBiomeClick}>Ajouter un biome</button>
          </div>

        </div>

      </div>
    )
  }
}

export default App
