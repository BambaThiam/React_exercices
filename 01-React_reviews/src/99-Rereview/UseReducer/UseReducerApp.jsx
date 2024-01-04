import React from 'react'

import DateCounter from './components/DateCounter'
import ReactQuiz from './components/ReactQuiz'

const useReducerApp = () => {
  return (
    <div>
      <h5 className="underline decoration-pink-500 p-2 font-bold mt-10 text-4xl">
        DateCounter
      </h5>
      <DateCounter />
      <h5 className="underline decoration-pink-500 p-2 font-bold mt-10 text-4xl">
        React Quiz App
      </h5>
      <h5 className="underline decoration-pink-500 p-2 font-bold mt-10 text-4xl">
        NB : Ne pas oublier de lancer le serveur (cd ... puis "pnpm run server")
      </h5>
      <ReactQuiz />
    </div>
  )
}

export default useReducerApp
