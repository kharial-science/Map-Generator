import React, { Component } from 'react'

import './App.css'

import Main from './Main/Main'
import Presentation from './Presentation/Presentation'
import Lab from './Lab/Lab'
import Footer from './Footer/Footer'
import InfoButtons from './Main/InfoButtons/InfoButtons'
import Biomes from './Main/Biome/Biomes'
import Map from './Main/Map/Map'

import { generate, expand, fix, concatenateMap } from './lib/generator'
import download from './lib/download'
import createAvailableBiomesArray from './lib/createAvailableBiomesArray.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mapWidth: 40,
      map: generate(this.mapWidth, 'map'),
      biomes: [{ name: 'ocean', color: '#add8e6', number: 3 }, { name: 'plains', color: '#90ee90', number: 2 }],
      mapBiomes: [{ name: 'ocean', color: '#add8e6', number: 3 }, { name: 'plains', color: '#90ee90', number: 2 }]
    }

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleReRenderClick = this.handleReRenderClick.bind(this)
    this.handleAddBiomeClick = this.handleAddBiomeClick.bind(this)
    this.handleBiomeInputChange = this.handleBiomeInputChange.bind(this)
    this.handleFixMapClick = this.handleFixMapClick.bind(this)
    this.handleMapWidthChange = this.handleMapWidthChange.bind(this)
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

  handleMapWidthChange(event) {
    this.setState({mapWidth: parseInt(event.target.value, 10)})
  }

  handleBiomeInputChange(event, biomeID, inputClass) {
    const newBiomeList = [...this.state.biomes]
    if (inputClass !== "number") newBiomeList[biomeID][inputClass] = event.target.value
    else newBiomeList[biomeID][inputClass] = parseInt(event.target.value, 10)
    this.setState({biomes: newBiomeList})
  }

  handleReRenderClick () {

    let mapBiomes = []
    Array.from(document.querySelector('#Biomes').getElementsByClassName('biome-selector')).forEach(biomeSelector => {
      mapBiomes.push({
        name: biomeSelector.getElementsByClassName('biome-name-input')[0].value,
        color: biomeSelector.getElementsByClassName('biome-color-input')[0].value,
        number: biomeSelector.getElementsByClassName('biome-number-input')[0].value
      })
    })

    this.setState({
      mapBiomes: mapBiomes,
      map: generate(this.state.mapWidth, 'map', createAvailableBiomesArray(mapBiomes))
    })
  }

  render () {
    return (
      <div id='App'>
        <Main>
          <Map 
            map={this.state.map}
            mapBiomes={this.state.mapBiomes}
            handleMapClick={() => this.handleMapClick()}
            concatenateMap={concatenateMap}
          />

          <InfoButtons 
            mapWidth={this.state.mapWidth}
            handleMapWidthChange={this.handleMapWidthChange}
            handleFixMapClick={this.handleFixMapClick}
            handleReRenderClick={this.handleReRenderClick}
            handleSaveClick={this.handleSaveClick}
          />

          <Biomes 
            handleAddBiomeClick={this.handleAddBiomeClick}
            handleBiomeInputChange={this.handleBiomeInputChange}
            biomes={this.state.biomes}
          />
        </Main>

        <Presentation />

        <Lab>
          <Map 
            map={this.state.map}
            mapBiomes={this.state.mapBiomes}
            handleMapClick={() => this.handleMapClick()}
            concatenateMap={concatenateMap}
          />

          <InfoButtons 
            mapWidth={this.state.mapWidth}
            handleMapWidthChange={this.handleMapWidthChange}
            handleFixMapClick={this.handleFixMapClick}
            handleReRenderClick={this.handleReRenderClick}
            handleSaveClick={this.handleSaveClick}
          />

          <Biomes 
            handleAddBiomeClick={this.handleAddBiomeClick}
            handleBiomeInputChange={this.handleBiomeInputChange}
            biomes={this.state.biomes}
          />
        </Lab>

        <Footer />
      </div>
    )
  }
}

export default App
