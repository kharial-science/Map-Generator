import React from 'react'

function Chunk(props) {
    return (
        <div className={`chunk ${props.biome} ${props.status}`}></div>
    )
}

export default Chunk