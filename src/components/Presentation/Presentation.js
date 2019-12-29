import React, { Component } from 'react'

import Explanation from './Explanation'

import './Presentation.css'

class Presentation extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const observer = new IntersectionObserver((entries, observer) => {
      console.log(window.screen.orientation.type)
      if (entries[0].isIntersecting) {
        if (window.innerWidth < 768 || window.screen.orientation.type == "portrait-secondary" || window.screen.orientation.type == "portrait-primary") {
          document.getElementsByClassName('exp-one')[0].style.animation = '15s linear -5s infinite slide'
          document.getElementsByClassName('exp-two')[0].style.animation = '15s linear 0s infinite slide'
          document.getElementsByClassName('exp-three')[0].style.animation = '15s linear 5s infinite slide'
        }

        let animationDelay = 0

        Array.from(document.getElementsByClassName('Explanation')).forEach(element => {
          setTimeout(() => element.classList.add('shown'), animationDelay * 2000)
          animationDelay += 0.25
        })

        animationDelay += 1.5

        const sowingChunks = Array.from(document.getElementsByClassName('sowin'))
        sowingChunks.forEach(chunkElement => {
          chunkElement.style.animation = `sowing 0.6s ${animationDelay}s forwards`
          animationDelay += 0.4
        })

        animationDelay += 1

        const expandingChunks = Array.from(document.getElementsByClassName('expandin'))
        expandingChunks.forEach(chunkElement => {
          chunkElement.style.animation = `expanding 0.6s ${animationDelay}s forwards`
          animationDelay += 0.25
        })

        animationDelay += 1

        const fixingChunks = Array.from(document.getElementsByClassName('fixin'))
        fixingChunks.forEach(chunkElement => {
          chunkElement.style.animation = `fixing 1s ${animationDelay}s forwards`
          animationDelay += 0.5
        })

        observer.unobserve(document.querySelector('#explanation-container'))
      }
    })

    observer.observe(document.querySelector('#explanation-container'))
  }

  render () {
    return (
      <div id='Presentation'>
        <div className='header-container'>
          <header>
            <h1>Map Generator</h1>
            <p>Kharoh Family Science Map Generator prototype, later usage in generating Kharoh Families' maps</p>
          </header>
        </div>

        <div id='explanation-container'>
          <Explanation number={0} />
          <Explanation number={1} />
          <Explanation number={2} />
        </div>
      </div>
    )
  }
}

export default Presentation
