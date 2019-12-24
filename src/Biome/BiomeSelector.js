import React, { Component } from 'react'

class BiomeSelector extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    return (
      <div id={`biome-selector-${this.props.id}`} className='biome-selector'>

        <div className='label-container'>
          <label>
            Biome Name
            <input className='biome-name-input' type='text' value={this.props.name} onChange={event => this.props.handleBiomeInputChange(event, this.props.id, 'name')} />
          </label>
        </div>

        <div className='label-container'>
          <label>
            Biome Color
            <input className='biome-color-input' type='color' value={this.props.color} onChange={event => this.props.handleBiomeInputChange(event, this.props.id, 'color')} />
          </label>
        </div>

        <div className='label-container'>
          <label>
            Number
            <input className='biome-number-input' type='number' value={this.props.number} onChange={event => this.props.handleBiomeInputChange(event, this.props.id, 'number')} />
          </label>
        </div>

      </div>
    )
  }
}

export default BiomeSelector
