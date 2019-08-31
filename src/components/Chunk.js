import React, { Component } from 'react'

class Chunk extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id={`${this.props.x}|${this.props.y}`} className='chunk'></div>
        )
    }
}

export default Chunk