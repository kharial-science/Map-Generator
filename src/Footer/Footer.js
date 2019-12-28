import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='Footer'>
        <div className='footer-title-container'>
          <h2>Kharoh Family Science</h2>
        </div>
        <a href='https://discord.gg/AUTXwEA'><img src={require('../assets/kfs.png')} id='ourLogo' /></a>
        <div className='social-networks'>
          <a href='https://kharohfamily-science.github.io/Kharoh-Family-Science/' className='social-network website' target='_blank'><img src={require('../assets/website.png')} alt='website' /></a>
          <a href='https://discord.gg/AUTXwEA' className='social-network discord' target='_blank'><img src='https://img.icons8.com/dotty/80/000000/discord-logo.png' alt='discord' /></a>
          <a href='https://github.com/kharohfamily-science' className='social-network' target='_blank'><img src='https://img.icons8.com/dotty/80/000000/github.png' alt='github' /></a>
          <a href='https://twitter.com/KFamilyScience' className='social-network' target='_blank'><img src='https://img.icons8.com/dotty/80/000000/twitter.png' alt='twitter' /></a>
        </div>
      </div>
    )
  }
}

export default Footer
