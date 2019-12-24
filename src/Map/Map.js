import React from 'react'

import Chunk from './Chunk'

import './Map.css'

const Map = (props) => {
  const chunkArray = props.concatenateMap(props.map)
  const chunkComponentsArray = chunkArray.map((chunk, index) => {
    return (
      <Chunk
        key={index}
        biome={chunk ? chunk.biome : null}
        color={chunk ? props.mapBiomes.find(biome => biome.name === chunk.biome).color : null}
        status={chunk ? chunk.status : null}
      />
    )
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
