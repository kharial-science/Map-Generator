import React from 'react'

import Chunk from './Chunk'

import './Map.css'

function Map (props) {
  const chunkArray = props.concatenateMap(props.map)
  let chunkKey = -1
  console.log(props.mapBiomes)
  const chunkComponentsArray = chunkArray.map(chunk => {
    chunkKey++
    return <Chunk key={chunkKey} biome={chunk ? chunk.biome : null} color={chunk ? props.mapBiomes.find(biome => biome.name === chunk.biome).color : null} status={chunk ? chunk.status : null} />
  })

  return (
    <div
      id='Map'
      style={{
        gridTemplateColumns: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
        gridTemplateRows: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`
      }}
      onClick={() => props.handleMapClick()}
    >

      {chunkComponentsArray}

    </div>
  )
}

export default Map
