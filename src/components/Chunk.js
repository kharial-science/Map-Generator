import React, { Component } from 'react'

class Chunk extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`chunk ${this.props.biome} ${this.props.status}`}></div>
        )
    }
}

export default Chunk