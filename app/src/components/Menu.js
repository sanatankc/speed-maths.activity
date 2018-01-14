import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #304860;
  transform: ${props => props.show ? 'translateY(0px)' : 'translateY(-100%)'};
  transition: 0.2s all ease-in-out;
`
const Pop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #b7c7d7;
  color: #304860;
  border-radius: 5px;
  align-items: center;
  width: calc(100% - 150px);
  height: 200px;
  letter-spacing: 2px;
  margin-bottom: 20px;
`
const BigText = styled.div`
  font-size: 36px;
`
const ScoreText = styled.div`
  &:first-child {
    padding-top: 20px;
  }
  &:last-child {
    padding-top: 10px;
  }
`
const PlayButton = styled.div`
  width: 60px;
  height: 50px;
  background: url('icons/play.svg');
  margin-bottom: 40px;
`

const SpeedButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.selected ? '#b7c7d7' : '#304860'};
  height: 38px;
  width: 90px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  color: ${props => props.selected ? '#304860' : '#b7c7d7'};
  letter-spacing: 2px;
  border: 2px solid #b7c7d7;
`
const SpeedButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 150px);
`
export default class Menu extends Component {
  render() {
    const { show, difficulty, onPlay , onDifficulty} = this.props
    return (
      <Container show={show}>
          <Pop>
            <BigText>Game Over</BigText>
            <div>
              <ScoreText>Score: 0</ScoreText>
              <ScoreText>Best Score: 0</ScoreText>
            </div>
          </Pop>
          <PlayButton onClick={onPlay} />
          <SpeedButtonContainer>
            <SpeedButton selected={difficulty === 0} onClick={() => {onDifficulty(0)}}>easy</SpeedButton>
            <SpeedButton selected={difficulty === 1} onClick={() => {onDifficulty(1)}}>medium</SpeedButton>
            <SpeedButton selected={difficulty === 2} onClick={() => {onDifficulty(2)}}>hard</SpeedButton>
          </SpeedButtonContainer>
      </Container>
    )
  }
}