import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Map from './components/Map'

import { generate, expand, concatenateMap } from './generator'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapWidth: 40,
            map: generate(this.mapWidth, 'map'), // width={20} availableBiomes={['ocean', 'ocean', 'ocean', 'ocean', 'plains', 'plains', 'plains', 'swamp', 'magicforest']}
        }
        this.handleMapClick = this.handleMapClick.bind(this)
        this.handleReRenderClick = this.handleReRenderClick.bind(this)
    }

    handleMapClick() {
        this.setState({map: expand(this.state.map)})
    }

    handleReRenderClick() {
        this.setState({
            mapWidth: parseInt(document.getElementById('map-dimensions').value, 10),
        }, 
        () => {
            this.setState({
                map: generate(this.state.mapWidth, 'map')
            })
        })
        
    }

    render() {
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
                    <label>
                        Dimension
                        <input id='map-dimensions' type="number" defaultValue={this.state.mapWidth}/*value={this.state.mapWidth} onChange={this.handleMapWidthChange}*/ />
                    </label>
                    <button className='reRenderButton' onClick={this.handleReRenderClick}>re-render</button>
                </div>   
            </div>
        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
);