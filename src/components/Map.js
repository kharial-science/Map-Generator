import React, { Component } from 'react'

import chunkArray from '../generator/generator.js'

class Map extends Component {
    constructor(props) {
        super(props)
    }

     


    render() {

        let chunkComponentsArray = chunkArray.map(chunk => <Chunk x={chunk.x} y={chunk.y} height={chunk.height} />)

        return (
            {chunkComponentsArray}
        )
    }
}


export default Map;