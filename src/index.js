import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Map from './components/Map'
import BiomeSelector from './components/BiomeSelector'

import { generate, expand } from './generator'
import download from './lib/download.js'
import createAvailableBiomesArray from './lib/createAvailableBiomesArray.js'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapWidth: 40,
            map: generate(this.mapWidth, 'map'), // width={20} availableBiomes={['ocean', 'ocean', 'ocean', 'ocean', 'plains', 'plains', 'plains', 'swamp', 'magicforest']}
            biomes: [
                {
                    name: 'ocean',
                    color: 'lightblue',
                    number: 3,
                },
                {
                    name: 'plains',
                    color: 'lightgreen',
                    number: 2
                }
            ]
        }
        this.handleMapClick = this.handleMapClick.bind(this)
        this.handleSaveClick = this.handleSaveClick.bind(this)
        this.handleReRenderClick = this.handleReRenderClick.bind(this)
        this.handleAddBiomeClick = this.handleAddBiomeClick.bind(this)
    }

    handleAddBiomeClick() {
        let newBiomeList = [...this.state.biomes]
        newBiomeList.push({name: 'nom', color:'couleur', number:0, })
        this.setState({biomes: newBiomeList})
    }

    handleMapClick() {
        this.setState({map: expand(this.state.map)})
    }

    handleSaveClick() {
        download(`Map (${this.state.mapWidth})`, this.state.map, document)
    }

    handleReRenderClick() {

        let newBiomeList = []
        Array.from(document.getElementsByClassName('biome-selector')).forEach(biomeSelector => {
            newBiomeList.push({
                name: biomeSelector.getElementsByClassName('biome-name-input')[0].value,
                color: biomeSelector.getElementsByClassName('biome-color-input')[0].value,
                number: biomeSelector.getElementsByClassName('biome-number-input')[0].value,
            })
        })

        this.setState({
            mapWidth: parseInt(document.getElementById('map-dimensions').value, 10),
            biomes: newBiomeList,
        }, 
        () => {
            console.log()
            this.setState({
                map: generate(this.state.mapWidth, 'map', createAvailableBiomesArray(this.state.biomes))
            })
        })
    }

    render() {

        let biomeKey = -1
        let biomeComponentArray = Array.from(this.state.biomes).map(biome => {
            biomeKey++
            return <BiomeSelector key={biomeKey} name={biome.name} color={biome.color} number={biome.number} />
        })

        return (
            <div className='main-grid'>

                <div className='header'>
                    <h1>Hello World !</h1>
                    <p>Here is the kfs prototype to map generation</p>
                </div>

                <Map 
                    map={this.state.map}
                    onClick={() => this.handleMapClick()}
                />

                <div className='map-infos'>

                    <div className='map-dimensions-container label-container'>
                        <label className='map-dimensions-label'>
                            Dimension
                            <input id='map-dimensions' type="number" defaultValue={this.state.mapWidth}/*value={this.state.mapWidth} onChange={this.handleMapWidthChange}*/ />
                        </label>
                    </div>
                    
                    <div className='save-button-container button-container'>
                        <button className='saveButton' onClick={this.handleSaveClick}>save</button>
                    </div>

                    <div className='re-render-button-container button-container'>
                        <button className='reRenderButton' onClick={this.handleReRenderClick}>re-render</button>
                    </div>
                    
                </div>

                <div className='map-biomes'>
                    {biomeComponentArray}
                    <button onClick={this.handleAddBiomeClick}>Ajouter un biome</button>

                </div>

            </div>
        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
);