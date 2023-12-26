import React from 'react'

const StartScreen = ({ numQuestions }) => {
  return (
    <div className="start2">
      <h2 className="quizh2">Welcome to the React Quiz!</h2>
      <h3 className="quizh3">
        {numQuestions} questions to test your React mastery
      </h3>
      <button className="btn2 btn2-ui">Let's start</button>
    </div>
  )
}

export default StartScreen
