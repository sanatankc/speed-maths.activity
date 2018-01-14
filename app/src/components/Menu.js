
import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
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
  @media only screen and (max-width: 500px) {
    width: calc(100vw - 60px);
  }
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
  cursor: pointer;
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
  @media only screen and (max-width: 500px) {
    width: calc(100vw - 60px);
  }
`
const Tip = styled.div`
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  color: #b7c7d7;
  letter-spacing: 1.2px;
  line-height: 19px;
  text-align: center;
`
export default class Menu extends Component {
  render() {
    const { show, difficulty, onPlay , onDifficulty, score, bestScore, isThisFirstTime} = this.props
    return (
      <Container show={show}>
          <Pop>
            <BigText>{isThisFirstTime ? 'Welcome' : 'Game Over'}</BigText>
            {!isThisFirstTime &&
              <div>
                <ScoreText>Score: {score}</ScoreText>
                <ScoreText>Best Score: {bestScore}</ScoreText>
              </div>
            }
            <Tip>Tip: You can also use arrow keys, i.e left arrow for right answer and right arrow for wrong answers</Tip>
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