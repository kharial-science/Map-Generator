import React, { Component } from 'react'

import './Probabilities.css'

import ChunkProbability from './ChunkProbability'

class Probabilities extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedChunk: undefined
    }

    this.handleChunkClick = this.handleChunkClick.bind(this)
  }

  handleChunkClick (id) {
    console.log(id)
    this.setState({ selectedChunk: id })
  }

  render () {
    const chunks = []
    for (let i = 0; i < 24; i++) {
      chunks.push(
        <ChunkProbability
          key={i}
          id={i}
          handleChunkClick={this.handleChunkClick}
          probability={this.props.probabilities[i]}
          isSelected={this.state.selectedChunk === i}
        />
      )
    }

    return (
      <div id='Probabilities'>
        <div className='chunks-container'>
          {chunks.slice(0, 12)}
          <div className='base-chunk' />
          {chunks.slice(12, 24)}
        </div>

        <div className='cursor-input-container'>
          <label for='probability'>Probability</label>
          {typeof this.state.selectedChunk === 'number' &&
            <input
              type='range' id='probability-range' name='probability' min='0' max='1' step='0.01'
              value={this.props.probabilities[this.state.selectedChunk] ? this.props.probabilities[this.state.selectedChunk] : 0}
              onChange={(event) => this.props.handleProbabilityChange(this.state.selectedChunk, event)}
            />}
        </div>

      </div>
    )
  }
}

export default Probabilities
