import React from 'react'

import Chunk from './Chunk'

import { concatenateMap } from '../lib/generator'

import './Map.css'

function Map (props) {
  const chunkArray = concatenateMap(props.map)
  let chunkKey = -1
  const chunkComponentsArray = chunkArray.map(chunk => {
    chunkKey++
    return <Chunk key={chunkKey} biome={chunk ? chunk.biome : null} color={chunk ? props.biomes.find(biome => biome.name === chunk.biome).color : null} status={chunk ? chunk.status : null} />
  })

  return (
    <div
      id='Map'
      style={{
        gridTemplateColumns: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
        gridTemplateRows: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`
      }}
      onClick={() => props.onClick()}
    >

      {chunkComponentsArray}

    </div>
  )
}

export default Map
