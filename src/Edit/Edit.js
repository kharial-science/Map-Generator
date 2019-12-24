import React, { useState, useEffect } from 'react'

import './Edit.css'

const Edit = (props) => {
    return (
        <div id="Edit">

            <div className="button-container">
                <button onClick={props.handleEditClick}>edit mode</button>
            </div>

            <div className="biome-selector">
                <div className='label-container'>
                    <label>
                        Biome Name
                        <input className='biome-name-input' type='text' />
                    </label>
                </div>

                <div className='label-container'>
                    <label>
                        Biome Color
                        <input className='biome-color-input' type='color' />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Edit