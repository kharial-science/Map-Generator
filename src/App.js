import React, { Component } from 'react'

import './App.css'

import Main from './Main/Main'
import Presentation from './Presentation/Presentation'
import Lab from './Lab/Lab'
import InfoButtons from './InfoButtons/InfoButtons'
import Biomes from './Biome/Biomes'
import Edit from './Edit/Edit'
import Map from './Map/Map'
import Footer from './Footer/Footer'

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
      mapBiomes: [{ name: 'ocean', color: '#add8e6', number: 3 }, { name: 'plains', color: '#90ee90', number: 2 }],
      editBiomes: [],
      editMode: false,
    }

    this.handleMapClick = this.handleMapClick.bind(this)
    this.handleChunkClick = this.handleChunkClick.bind(this)
    this.handleBiomeInputChange = this.handleBiomeInputChange.bind(this)
    this.handleAddBiomeClick = this.handleAddBiomeClick.bind(this)
    this.handleMapWidthChange = this.handleMapWidthChange.bind(this)
    this.handleFixMapClick = this.handleFixMapClick.bind(this)
    this.handleSaveClick = this.handleSaveClick.bind(this)
    this.handleReRenderClick = this.handleReRenderClick.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleMapClick() {
    this.setState({ map: expand(this.state.map) })
  }

  handleChunkClick(chunkID) {
    if (this.state.editMode) {
      const newMap = this.state.map
      const newChunk = { biome: document.getElementById('edit-biome-name-input').value + document.getElementById('edit-biome-color-input').value, status: 'expanding'}
      newMap[Math.floor(chunkID / this.state.mapWidth)][chunkID % this.state.mapWidth] = newChunk
      const newEditBiomes = this.state.editBiomes
      if (!newEditBiomes.find(biome => biome.name === newChunk.biome)) newEditBiomes.push({ name: newChunk.biome, color: document.getElementById('edit-biome-color-input').value})
      this.setState({
        map: newMap,
        editBiomes: newEditBiomes
      })
    }
  }
  
  handleBiomeInputChange(event, biomeID, inputClass) {
    const newBiomeList = [...this.state.biomes]
    if (inputClass !== "number") newBiomeList[biomeID][inputClass] = event.target.value
    else newBiomeList[biomeID][inputClass] = parseInt(event.target.value, 10)
    this.setState({biomes: newBiomeList})
  }

  handleAddBiomeClick () {
    const newBiomeList = [...this.state.biomes]
    newBiomeList.push({ name: 'nom', color: 'couleur', number: 0 })
    this.setState({ biomes: newBiomeList })
  }

  handleMapWidthChange(event) {
    this.setState({mapWidth: parseInt(event.target.value, 10)})
  }

  handleFixMapClick () {
    this.setState({ map: fix(this.state.map) })
  }

  handleSaveClick () {
    download(`Map (${this.state.mapWidth})`, this.state.map, document)
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
      editBiomes: [],
      map: generate(this.state.mapWidth, 'map', createAvailableBiomesArray(mapBiomes))
    })
  }

  handleEditClick() {
    this.setState({ editMode: !this.state.editMode })
  }

  render () {
    return (
      <div id='App'>
        <Main>
          <Map 
            map={this.state.map}
            mapBiomes={this.state.mapBiomes.concat(this.state.editBiomes)}
            handleMapClick={this.handleMapClick}
            handleChunkClick={this.handleChunkClick}
            concatenateMap={concatenateMap}
            editMode={this.state.editMode}
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

        <Lab
          map = {
            <Map 
              map={this.state.map}
              mapBiomes={this.state.mapBiomes.concat(this.state.editBiomes)}
              handleMapClick={this.handleMapClick}
              handleChunkClick={this.handleChunkClick}
              concatenateMap={concatenateMap}
              editMode={this.state.editMode}
            />
          }

          parameters = {[
            <InfoButtons 
              mapWidth={this.state.mapWidth}
              handleMapWidthChange={this.handleMapWidthChange}
              handleFixMapClick={this.handleFixMapClick}
              handleReRenderClick={this.handleReRenderClick}
              handleSaveClick={this.handleSaveClick}
            />,

            <Biomes 
              handleAddBiomeClick={this.handleAddBiomeClick}
              handleBiomeInputChange={this.handleBiomeInputChange}
              biomes={this.state.biomes}
            />,

            <Edit
              handleEditClick={this.handleEditClick}
            />
          ]}
        />

        <Footer />
      </div>
    )
  }
}

export default App
