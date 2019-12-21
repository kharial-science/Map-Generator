import React, { Component } from 'react'

import './Lab.css'

class Lab extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='Lab'>
        {this.props.children}
      </div>
    )
  }
}

export default Lab
