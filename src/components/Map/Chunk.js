import React from 'react'

const Chunk = (props) => {
  return (
    <div
      className={`Chunk ${props.biome} ${props.status}`}
      style={props.color ? {
        backgroundColor: props.color
      } : undefined}
      onClick={() => props.handleChunkClick(props.id)}
    />
  )
}

export default Chunk
