import React, { Component } from 'react'

class BiomeSelector extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='biome-selector'>

                <div className='label-container'>
                    <label>
                        Nom du biome
                        <input className='biome-name-input' type='text' defaultValue={this.props.name}></input>
                    </label>
                </div>
                
                <div className='label-container'>
                    <label>
                        Couleur du biome
                        <input className='biome-color-input' type='color' defaultValue={this.props.color}></input>
                    </label>
                </div>
                
                <div className='label-container'>
                    <label>
                        Nombre
                        <input className='biome-number-input' type='number' defaultValue={this.props.number}></input>
                    </label>
                </div>
                
            </div>
        )
    }
}

export default BiomeSelector