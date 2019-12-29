import React, { Component } from 'react'

import './App.css'

import Main from './components/Main/Main'
import Presentation from './components/Presentation/Presentation'
import Lab from './components/Lab/Lab'
import NoLab from './components/NoLab/NoLab'
import InfoButtons from './components/InfoButtons/InfoButtons'
import Biomes from './components/Biome/Biomes'
import Edit from './components/Edit/Edit'
import Probabilities from './components/Probabilities/Probabilities'
import Map from './components/Map/Map'
import Footer from './components/Footer/Footer'

import { generate, expand, fix, concatenateMap } from './lib/generator'
import download from './lib/download'
import createAvailableBiomesArray from './lib/createAvailableBiomesArray.js'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      backgroundChunks: [],
      mapWidth: 40,
      map: generate(this.mapWidth, 'map'),
      biomes: [{ name: 'ocean', color: '#add8e6', number: 3 }, { name: 'plains', color: '#90ee90', number: 2 }],
      mapBiomes: [{ name: 'ocean', color: '#add8e6', number: 3 }, { name: 'plains', color: '#90ee90', number: 2 }],
      editBiomes: [],
      editMode: false,
      probabilities: { 6: 0.3, 7: 0.75, 8: 0.3, 11: 0.75, 12: 0.75, 15: 0.3, 16: 0.75, 17: 0.3 }
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
    this.handleProbabilityChange = this.handleProbabilityChange.bind(this)
  }

  componentDidMount() {
    const backgroundChunksPos = []
    for (let i = 0; i < 100; i++) {
      backgroundChunksPos.push([Math.floor(Math.random()*20), Math.floor(Math.random()*40)])
    }
    const backgroundChunks = backgroundChunksPos.map((pos, index) => {
      return (
        <div
          key={index}
          style={{
            width: "100%",
            height: "100%",
            gridColumnStart: pos[0],
            gridRowStart: pos[1],
            backgroundColor: Math.random() < 0.5 ? 'lightgreen' : 'lightblue',
            animation: `chunksAnimation 20s ${(pos[0] + pos[1]) * 0.1}s infinite linear`
          }}
        />
      )
    })
    this.setState({ backgroundChunks: backgroundChunks })

    window.addEventListener("orientationchange", function() {
      console.log('orientation changed')
      window.location.reload()
    });

  }

  handleMapClick () {
    this.setState({ map: expand(this.state.map, this.state.probabilities) })
  }

  handleChunkClick (chunkID) {
    if (this.state.editMode) {
      const newMap = this.state.map
      const newChunk = { biome: document.getElementById('edit-biome-name-input').value + document.getElementById('edit-biome-color-input').value, status: 'expanding' }
      newMap[Math.floor(chunkID / this.state.mapWidth)][chunkID % this.state.mapWidth] = newChunk
      const newEditBiomes = this.state.editBiomes
      if (!newEditBiomes.find(biome => biome.name === newChunk.biome)) newEditBiomes.push({ name: newChunk.biome, color: document.getElementById('edit-biome-color-input').value })
      this.setState({
        map: newMap,
        editBiomes: newEditBiomes
      })
    }
  }

  handleBiomeInputChange (event, biomeID, inputClass) {
    const newBiomeList = [...this.state.biomes]
    if (inputClass !== 'number') newBiomeList[biomeID][inputClass] = event.target.value
    else newBiomeList[biomeID][inputClass] = parseInt(event.target.value, 10)
    this.setState({ biomes: newBiomeList })
  }

  handleAddBiomeClick () {
    const newBiomeList = [...this.state.biomes]
    newBiomeList.push({ name: 'name', color: 'color', number: 0 })
    this.setState({ biomes: newBiomeList })
  }

  handleMapWidthChange (event) {
    this.setState({ mapWidth: parseInt(event.target.value, 10) })
  }

  handleFixMapClick () {
    this.setState({ map: fix(this.state.map) })
  }

  handleSaveClick () {
    download(`Map (${this.state.mapWidth})`, this.state.map, document)
  }

  handleReRenderClick () {
    const mapBiomes = []
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

  handleEditClick () {
    this.setState({ editMode: !this.state.editMode })
  }

  handleProbabilityChange (selectedChunk, event) {
    const newProbabilities = this.state.probabilities
    newProbabilities[selectedChunk] = parseFloat(event.target.value, 10)
    console.log(newProbabilities)
    this.setState({ probabilities: newProbabilities })
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

        {window.innerWidth >= 768 && (window.screen.orientation.type == "landscape-primary" || window.screen.orientation.type == "landscape-secondary")

          ? <Lab
            map={
              <Map
                map={this.state.map}
                mapBiomes={this.state.mapBiomes.concat(this.state.editBiomes)}
                handleMapClick={this.handleMapClick}
                handleChunkClick={this.handleChunkClick}
                concatenateMap={concatenateMap}
                editMode={this.state.editMode}
              />
            }

            parameters={[
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
                editMode={this.state.editMode}
              />,

              <Probabilities
                handleProbabilityChange={this.handleProbabilityChange}
                probabilities={this.state.probabilities}
              />,

              <div className='end-div' />
            ]}
            />

          : <NoLab />}

        <Footer />

        <div className="background">
          {this.state.backgroundChunks}
        </div>
      </div>
    )
  }
}

export default App
