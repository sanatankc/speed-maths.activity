import React, { Component } from 'react'
import styled from 'styled-components'

const PlayButton = styled.button`
  background: url('icons/plus.svg')
`
const MinusButton = styled.button`
  background: url('icons/minus.svg')
`

class Toolbar extends Component {
  render() {
    return (
      <div id="main-toolbar" className="react-toolbar toolbar">
        <button className="toolbutton" id="activity-button" title="Speed Maths"></button>
        <button className="toolbutton pull-right" id="stop-button" title="Stop"></button>
      </div>
    )
  }
}

export default Toolbar
