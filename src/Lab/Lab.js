import React from 'react'

import './Lab.css'

const Lab = (props) => {
  return (
    <div id='Lab'>
      {props.map}
      <div id="parameters">
        {props.parameters}
      </div>
    </div>
  )
}

export default Lab
