import React from 'react'

import './NoLab.css'

const NoLab = (props) => {
  return (
    <div id='NoLab'>
      <div className='no-lab-container'>
        <img src='https://img.icons8.com/dusk/64/000000/lock-2.png' alt='lock icon' />
        <h2>{window.screen.orientation == "landscape-primary" || window.screen.orientation == "landscape-secondary" ? "Check the PC version in order to find The Lab !" : "Switch to landscape mode in order to find the Lab"}</h2>
      </div>
    </div>
  )
}

export default NoLab
