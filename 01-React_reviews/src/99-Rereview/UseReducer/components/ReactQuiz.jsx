import React, { useEffect, useReducer } from 'react'
import index from './index.css'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import StartScreen from './StartScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'

const initialState = {
  questions: [],
  // "loading" | "ready" | "error" | "finished" | "active"
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
}

const reducer = (state, action) => {
  const question = state.questions.at(state.index)
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    case 'newAnswer':
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    case 'nextQuestion':
      return {
        ...state,
        answer: null,
        index: state.index + 1,
        status:
          state.index + 1 < state.questions.length ? 'active' : 'finished',
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart':
      return initialState

    default:
      throw new Error('Action inconnue')
  }
}
const ReactQuiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { questions, status, index, answer, points } = state

  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, question) => prev + question.points,
    0
  )

  useEffect(() => {
    fetch('http://localhost:8000/questions').then((response) => {
      response
        .json()
        .then((data) => {
          dispatch({ type: 'dataReceived', payload: data })
        })
        .catch((err) => {
          dispatch({ type: 'dataFailed' })
        })
    })
  }, [])

  return (
    <div className="mainAppbody">
      <div className="app2">
        <Header />
        <Main className="main2">
          {status === 'loading' && <Loader />}
          {status === 'error' && <Loader />}
          {status === 'ready' && (
            <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          )}
          {status === 'active' && (
            <>
              <Progress
                index={index}
                numQuestions={numQuestions}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />

              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </>
          )}
          {status === 'finished' && (
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
          )}
        </Main>
      </div>
    </div>
  )
}

export default ReactQuiz
