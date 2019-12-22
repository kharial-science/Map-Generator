import React from 'react'

import './Lab.css'

const Lab = props => {
  return (
    <div id='Lab'>
      {props.children[0]} {/* Map */}
      <div id="parameters">
        {props.children[1]} {/* InfoButtons */}
        {props.children[2]} {/* Biomes */}
      </div>
    </div>
  )
}

export default Lab
