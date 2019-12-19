import React from 'react'

function Chunk (props) {
  return (
    <div
      className={`chunk ${props.biome} ${props.status}`}
      style={props.color ? {
        backgroundColor: props.color
      } : undefined}
    />
  )
}

export default Chunk
