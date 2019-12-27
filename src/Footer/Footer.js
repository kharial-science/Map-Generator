import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div id='Footer'>
        {/* <a href="https://kharohfamily-science.github.io/Kharoh-Family-Science/" className="social-network"><img src={require("../assets/website.png")} alt="website" /></a> */}
        <a href="https://discord.gg/AUTXwEA" className="social-network"><img src={"https://img.icons8.com/dotty/80/000000/discord-logo.png"} alt="discord" /></a>
        <a href="https://github.com/kharohfamily-science" className="social-network"><img src={"https://img.icons8.com/dotty/80/000000/github.png"} alt="github" /></a>
        <a href="https://twitter.com/KFamilyScience" className="social-network"><img src={"https://img.icons8.com/dotty/80/000000/twitter.png"} alt="twitter" /></a>
        {/* <iframe src="https://discordapp.com/widget?id=651121972763164673&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0"></iframe> */}
      </div>
    )
  }
}

export default Footer
