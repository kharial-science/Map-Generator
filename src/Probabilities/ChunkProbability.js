import React, { useState, useEffect } from 'react'

const ChunkProbability = (props) => {
    return (
        <div 
            className="ChunkProbability"
            onClick={() => props.handleChunkClick(props.id)}
            style={{backgroundColor: props.probability ? `rgba(65, 105, 225, ${props.probability})` : 'white'}}
        />
    )
}

export default ChunkProbability