import React from 'react'

import Chunk from './Chunk'

import './Map.css'

const Map = (props) => {
  const chunkArray = props.concatenateMap(props.map)
  const chunkComponentsArray = chunkArray.map((chunk, index) => {
    return (
      <Chunk
        key={index}
        id={index}
        biome={chunk ? chunk.biome : null}
        color={chunk ? props.mapBiomes.find(biome => biome.name === chunk.biome).color : null}
        status={chunk ? chunk.status : null}
        handleChunkClick={props.handleChunkClick}
      />
    )
  })

  return (
    <div
      id='Map'
      className={props.editMode ? 'edit' : ''}
      style={{
        gridTemplateColumns: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`,
        gridTemplateRows: `repeat(${Math.round(Math.sqrt(chunkArray.length))}, 1fr)`
      }}
      onClick={props.editMode ? () => {} : props.handleMapClick}
    >

      {chunkComponentsArray}

    </div>
  )
}

export default Map
