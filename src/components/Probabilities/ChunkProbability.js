import React, { useState, useEffect } from 'react'

const ChunkProbability = (props) => {
  return (
    <div
      className='ChunkProbability'
      onClick={() => props.handleChunkClick(props.id)}
      style={{
        backgroundColor: props.probability ? `rgba(65, 105, 225, ${props.probability})` : 'rgba(0, 0, 0, .07)',
        transform: props.isSelected ? 'scale(.9)' : null
      }}
    />
  )
}

export default ChunkProbability
