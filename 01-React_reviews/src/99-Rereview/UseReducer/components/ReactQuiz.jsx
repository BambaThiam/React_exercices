import React, { useEffect, useReducer } from 'react'
import index from './index.css'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import StartScreen from './StartScreen'
import Question from './Question'

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

    default:
      throw new Error('Action inconnue')
  }
}
const ReactQuiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { questions, status, index, answer } = state

  const numQuestions = questions.length

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
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </div>
  )
}

export default ReactQuiz
