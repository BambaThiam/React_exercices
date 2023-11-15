import React from 'react'

const DayCounter = () => {
  const [step, setStep] = React.useState(1)
  const [count, setCount] = React.useState(0)

  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const handleStepPlus = () => {
    setStep((s) => s + 1)
  }
  const handleStepMinus = () => {
    setStep((s) => s - 1)
  }

  const handleCountPlus = () => {
    setCount((c) => c + 1 * step)
  }
  const handleCountMinus = () => {
    setCount((c) => c - 1 * step)
  }

  return (
    <div>
      <div className="m-4">
        <button
          className="border-2 p-4 bg-gray-400"
          onClick={() => handleStepMinus()}
        >
          -
        </button>
        <span className="text-xl m-4 p-4">Step : {step}</span>
        <button
          className="border-2 p-4 bg-gray-400"
          onClick={() => handleStepPlus()}
        >
          +
        </button>
      </div>
      <div className="m-4">
        <button
          className="border-2 p-4 bg-gray-400"
          onClick={() => handleCountMinus()}
        >
          -
        </button>
        <span className="text-xl m-4 p-4">Count : {count}</span>
        <button
          className="border-2 p-4 bg-gray-400"
          onClick={() => handleCountPlus()}
        >
          +
        </button>
      </div>
      <div className="text-3xl m-10">
        <p>
          <span>
            {count === 0
              ? 'Today is '
              : count > 0
              ? `${count} days from today is `
              : `${Math.abs(count)} days ago was `}
          </span>
          <span>{date.toDateString()}</span>
        </p>
      </div>
    </div>
  )
}

export default DayCounter
