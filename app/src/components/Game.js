import React, { Component } from 'react'
import styled from 'styled-components';
import Menu from './Menu'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #b7c7d7;
  font-family: 'Ubuntu', sans-serif;
`

const Main = styled.div`
  width: calc((100vh - 55px - 70px) / 1.5);
  height: calc(100vh - 55px - 70px);
  max-width: 100vw;
  background: #304860;
  box-shadow: 5px 5px 25px 0 rgba(46,61,73,1);
  overflow: hidden;
  @media only screen and (max-width: 470px) {
    width: calc((100vh - 55px ) / 1.5);
    height: calc(100vh - 55px);
  }
`

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMenuShow: true,
      difficulty: 0,
    }
    this.onPlay = this.onPlay.bind(this)
    this.onDifficulty = this.onDifficulty.bind(this)
  }
  onPlay() {
    this.setState(prev => ({ shouldMenuShow: !prev.shouldMenuShow }))
  }
  onDifficulty(difficulty) {
    this.setState({ difficulty })
  }

  render() {
    return (
      <Container>
        <Main>
          <Menu
            show={this.state.shouldMenuShow}
            difficulty={this.state.difficulty}
            onPlay={this.onPlay}
            onDifficulty={this.onDifficulty}
          />
        </Main>
      </Container>
    )
  }
}