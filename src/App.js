import React, { Component } from 'react'

import './App.css'

import Main from './Main/Main'
import Presentation from './Presentation/Presentation'

import { generate, expand, fix, concatenateMap } from './lib/generator'
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
      this.setState({
        map: generate(this.state.mapWidth, 'map', createAvailableBiomesArray(this.state.biomes))
      })
    })
  }

  render () {
    return (
      <div id='App'>
        <Main
          // props for Map
          map={this.state.map}
          biomes={this.state.biomes}
          handleMapClick={() => this.handleMapClick()}
          concatenateMap={concatenateMap}

          // props for InfoButtons
          mapWidth={this.state.mapWidth}
          handleFixMapClick={this.handleFixMapClick}
          handleReRenderClick={this.handleReRenderClick}
          handleSaveClick={this.handleSaveClick}

          // props for Biomes
          handleAddBiomeClick={this.handleAddBiomeClick}
          biomes={this.state.biomes}
        />

        <Presentation />
      </div>
    )
  }
}

export default App
