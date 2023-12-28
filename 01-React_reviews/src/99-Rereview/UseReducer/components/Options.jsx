import React from 'react'

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn2 btn2-option ${answer === index ? 'answer2' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
