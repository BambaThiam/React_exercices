import React from 'react'

const NextButton = ({ dispatch, answer }) => {
  if (answer === null || answer === undefined) {
    return null
  }
  return (
    <button
      className="btn2 btn2-ui"
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  )
}

export default NextButton
