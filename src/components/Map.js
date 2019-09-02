import React from 'react'

import Chunk from './Chunk'

import { concatenateMap } from '../generator'

function Map(props) {
    let chunkArray = concatenateMap(props.map)
    let chunkKey = -1
    let chunkComponentsArray = chunkArray.map(chunk => {
        chunkKey++
        return <Chunk key={chunkKey} biome={chunk ? chunk.biome : null} color={chunk ? props.biomes.find(biome => biome.name === chunk.biome).color : null} status={chunk ? chunk.status : null} />
    })
    return (
        <div className='map-container'>
            <div 
                className='map' 
                style={{
                    gridTemplateColumns: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
                    gridTemplateRows: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
                }}
                onClick={() => props.onClick()}
            >

                {chunkComponentsArray}

            </div>
        </div>
    )
}


export default Map;