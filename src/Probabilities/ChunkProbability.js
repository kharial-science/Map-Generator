import React, { useState, useEffect } from 'react'

const ChunkProbability = (props) => {
    return (
        <div 
            className="ChunkProbability"
            onClick={() => props.handleChunkClick(props.id)}
        />
    )
}

export default ChunkProbability