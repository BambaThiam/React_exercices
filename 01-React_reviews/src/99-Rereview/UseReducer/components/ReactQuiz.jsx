import React, { useEffect, useReducer } from 'react'
import index from './index.css'
import Header from './Header'
import Main from './Main'

const initialState = {
  questions: [],
  // "loading" | "ready" | "error" | "finished" | "active"
  status: 'loading',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }

    default:
      throw new Error('Action inconnue')
  }
}
const ReactQuiz = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
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
          <p>1/15</p>
          <p>Questions?</p>
        </Main>
      </div>
    </div>
  )
}

export default ReactQuiz
