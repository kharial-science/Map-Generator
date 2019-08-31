import React, { Component } from 'react'

import Chunk from './Chunk'

import { generate, concatenateMap, expand } from '../generator'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            map: generate(this.props.width, 'map', this.props.availableBiomes),
        }
    }

    handleClick() {
        this.setState({map: expand(this.state.map)})
    }

    render() {
        let chunkArray = concatenateMap(this.state.map)
        let chunkKey = -1
        let chunkComponentsArray = chunkArray.map(chunk => {
            chunkKey++
            return <Chunk key={chunkKey} biome={chunk ? chunk.biome : null} status={chunk ? chunk.status : null} />
        })
        return (
            <div className='map-container'>
                <div className='map' style={{
                    gridTemplateColumns: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
                }}
                onClick={() => this.handleClick()}
                >
                    {chunkComponentsArray}
                </div>
            </div>
        )
    }
}


export default Map;