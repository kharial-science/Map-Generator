import React, { Component } from 'react'

class BiomeSelector extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='biome-selector'>

        <div className='label-container'>
          <label>
            Biome Name
            <input className='biome-name-input' type='text' defaultValue={this.props.name} />
          </label>
        </div>

        <div className='label-container'>
          <label>
            Biome Color
            <input className='biome-color-input' type='color' defaultValue={this.props.color} />
          </label>
        </div>

        <div className='label-container'>
          <label>
            Number
            <input className='biome-number-input' type='number' defaultValue={this.props.number} />
          </label>
        </div>

      </div>
    )
  }
}

export default BiomeSelector
