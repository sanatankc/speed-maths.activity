import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import StopWatch from 'timer-stopwatch'
import Menu from './Menu'

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #b7c7d7;
  font-family: 'Ubuntu', sans-serif;
`

const Main = styled.div`
  position: relative;
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

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #304860;
`

const Question = styled.div`
  margin-top: 10px;
  color: #fff;
  font-size: 72px;
  letter-spacing: 2px;
  ${props => props.extraMargin && css`
    margin-top: 50px;
  `}
`

const Loader = styled.div`
  position: absolute;
  left: 0px;
  height: 7px;
  width: 100%;
  background: white;
`

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 72px;
  color: #b7c7d7;
  opacity: 0.3;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 50px);
`
const RightButton = styled.div`
  cursor: pointer;
  width: 150px;
  height: 150px;
  background: url('icons/right.svg');
  background-repeat: no-repeat;
`
const WrongButton = styled.div`
  cursor: pointer;
  width: 150px;
  height: 150px;
  background: url('icons/wrong.svg');
  background-repeat: no-repeat;
`

const mapRange = (obj, num) => (((num - obj.from[0]) * (obj.to[1] - obj.to[0])) / (obj.from[1] - obj.from[0])) + obj.to[0]

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldMenuShow: true,
      difficulty: 0,
      question: null,
      answer: null,
      isCorrect: null,
      score: 0,
      bestScore: 0,
      isThisFirstTime: true,
    }
    this.onPlay = this.onPlay.bind(this)
    this.onDifficulty = this.onDifficulty.bind(this)
  }

  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (!this.state.shouldMenuShow) {
        if (e.key === 'ArrowLeft') {
          this.onRightClick()
        } else if (e.key === 'ArrowRight') {
          this.onWrongClick()
        }
      }
    })
  }

  setQuestionandAnswers() {
    const question = this.generateQuestion()
    const answerObj = this.generateAnswer(question)
    const { answer, isCorrect } = answerObj
    this.setState({
      question,
      answer,
      isCorrect
    }, this.setTimer.bind(this))
  }

  setTimer() {
    const timerSets = [6000, 4000, 2000]
    this.timer = new StopWatch(timerSets[this.state.difficulty])
    this.timer.start()
    let counter = 0
    this.timer.onTime(time => {
      const width = mapRange({
        from: [timerSets[this.state.difficulty], 0],
        to: [100, 0]
      }, time.ms)
      this.loader.style.width = `${width}%`
      counter++
    })
    this.timer.onDone(() => {
      this.doGameOver()
    })
  }

  doGameOver() {
    this.timer.stop()
    this.timer.reset()
    this.setState({shouldMenuShow: true})
    if (this.state.score > this.state.bestScore) {
      console.log(this.state.score)
      this.setState({bestScore: this.state.score})
    }
  }

  doNextQuestion() {
    this.timer.stop()
    this.timer.reset()
    this.setQuestionandAnswers()
    this.setState(prev => ({score: prev.score + 1}))
  }

  onRightClick() {
    if (this.state.isCorrect === 0) {
      this.doNextQuestion()
    } else {
      this.doGameOver()
    }
  }

  onWrongClick() {
    if (this.state.isCorrect === 1) {
      this.doNextQuestion()
    } else {
      this.doGameOver()
    }
  }

  generateAnswer(question) {
    const answer = eval(question)
    const wrongAnswers = [
      answer + Math.floor((Math.random() * 12) + 1),
      answer - Math.floor((Math.random() * 12) + 1)
    ]
    const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * 2)]
    const correctIndex = Math.floor(Math.random() * 2)
    return {
      answer: [answer, randomWrongAnswer][correctIndex],
      isCorrect: correctIndex
    }
  }

  onPlay() {
    this.setQuestionandAnswers()
    if (this.state.isThisFirstTime) {
      this.setState({isThisFirstTime: false})
    }
    this.setState(prev => ({
      shouldMenuShow: !prev.shouldMenuShow,
      score: 0
    }))
  }

  onDifficulty(difficulty) {
    this.setState({ difficulty })
  }

  generateQuestion() {
    const firstOperandSign = ['', '-'][Math.floor(Math.random() * 2)]
    const secondOperandSign = ['+', '-'][Math.floor(Math.random() * 2)]
    const firstOperandNum = Math.floor((Math.random() * 32) + 1)
    const secondOperandNum = Math.floor((Math.random() * 32) + 1)
    return `${firstOperandSign}${firstOperandNum}${secondOperandSign}${secondOperandNum}`
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
            score={this.state.score}
            bestScore={this.state.bestScore}
            isThisFirstTime={this.state.isThisFirstTime}
          />
          <GameContainer>
            <Loader innerRef={loader => { this.loader = loader }}></Loader>
            <Score>{this.state.score}</Score>
            <Question extraMargin>{this.state.question}</Question>
            <Question>= {this.state.answer}</Question>
            <ButtonsContainer>
              <RightButton onClick={this.onRightClick.bind(this)} />
              <WrongButton onClick={this.onWrongClick.bind(this)} />
            </ButtonsContainer>
          </GameContainer>
        </Main>
      </Container>
    )
  }
}