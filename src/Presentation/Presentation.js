import React, { Component } from 'react'

import './Presentation.css'

class Presentation extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    // let title = "Map Generator"
    // let cuts = []
    // for (let i = 0; i < 3; i++) {
    //     let cut = Math.ceil(Math.random() * title.length)
    //     if (cuts.indexOf(cut) === -1) {
    //         cuts.push(cut)
    //     }
    // }
    // cuts.sort((a, b) => a - b)

    // let titleSpanArray = []

    // let availableColors = ["lightgreen", "lightgreen", "lightblue"]
    // availableColors.sort(() => Math.random() - 0.5) // Used to mix the array

    // let previousCut = 0
    // cuts.forEach(cut => {
    //     titleSpanArray.push(<span>{title.substring(previousCut, cut-1)}</span>)
    //     titleSpanArray.push(<span style={{color: availableColors.pop()}}>{title.substring(cut-1, cut)}</span>)
    //     previousCut = cut
    // })
    // titleSpanArray.push(<span>{title.substring(previousCut, title.length)}</span>)

    return (
      <div id='Presentation'>
        <div className='header-container'>
          <header>
            <h1>Map Generator</h1>
            <p>Kharoh Family Science Map Generator prototype, later usage in generating Kharoh Families' maps</p>
          </header>
        </div>

      </div>
    )
  }
}

export default Presentation
