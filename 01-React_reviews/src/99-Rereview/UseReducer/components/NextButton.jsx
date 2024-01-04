import React from 'react'

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null || answer === undefined) {
    return null
  }
  if (index < numQuestions - 1)
    return (
      <button
        className="btn2 btn2-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    )

  if (index === numQuestions - 1)
    return (
      <button
        className="btn2 btn2-ui"
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    )
}

export default NextButton
