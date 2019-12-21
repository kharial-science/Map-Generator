import React, { Component } from 'react'

import Explanation from './Explanation'

import './Presentation.css'

class Presentation extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    const observer = new IntersectionObserver((entries, observer) => {

      if (entries[0].isIntersecting) {

        let animationDelay = 0.5

        const sowingChunks = Array.from(document.getElementsByClassName("sowin"))
        sowingChunks.forEach(chunkElement => {
          chunkElement.style.animation = `sowing 0.6s ${animationDelay}s forwards`
          animationDelay += 0.4
        })

        animationDelay += 1

        const expandingChunks = Array.from(document.getElementsByClassName("expandin"))
        expandingChunks.forEach(chunkElement => {
          chunkElement.style.animation = `expanding 0.6s ${animationDelay}s forwards`
          animationDelay += 0.25
        })

        animationDelay += 1

        const fixingChunks = Array.from(document.getElementsByClassName("fixin"))
        fixingChunks.forEach(chunkElement => {
          chunkElement.style.animation = `fixing 1s ${animationDelay}s forwards`
          animationDelay += 0.5
        })

        observer.unobserve(document.querySelector("#explanation-container"))
      }

    }, { threshold: 1 })

    observer.observe(document.querySelector("#explanation-container"))
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

        <div id="explanation-container">
          <Explanation number={0} />
          <Explanation number={1} />
          <Explanation number={2} />
        </div>
      </div>
    )
  }
}

export default Presentation
