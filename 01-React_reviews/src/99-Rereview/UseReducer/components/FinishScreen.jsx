import React from 'react'

const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }) => {
  const percentage = (points / maxPossiblePoints) * 100

  let emoji
  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🎉'
  if (percentage >= 50 && percentage < 80) emoji = '🙃'
  if (percentage >= 0 && percentage < 50) emoji = '🤨'
  if (percentage === 0) emoji = '🤦‍♂️'

  return (
    <div>
      <h2>Quiz Finished</h2>
      <p className="result2">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn2 btn2-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart quiz
      </button>
    </div>
  )
}

export default FinishScreen
