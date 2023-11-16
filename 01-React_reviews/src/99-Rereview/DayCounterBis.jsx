import React from 'react'

const DayCounterBis = () => {
  const [count, setCount] = React.useState(1)

  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const handleStepPlus = () => {
    setCount((s) => s + 1)
  }
  const handleStepMinus = () => {
    setCount((s) => s - 1)
  }

  const handleInput = (e) => {
    setCount(Number(e.target.value))
  }

  return (
    <div>
      <div className="flex flex-row text-center justify-center">
        <input
          type="range"
          min={-1_000}
          max={1_000}
          value={count}
          name="count"
          onChange={handleInput}
        />
        <span className="text-2xl p-4">Count: {count}</span>
      </div>

      <div className="m-4">
        <button
          className="border-2 p-4 bg-gray-400"
          onClick={() => handleStepMinus()}
        >
          -
        </button>
        <span className="text-xl m-4 p-4">
          <input
            type="text"
            value={Number(count)}
            name="count"
            onChange={handleInput}
            className="text-2xl m-4 p-4 justify-center text-center"
          />
        </span>
        <button
          className="border-2 p-4 bg-gray-400"
          onClick={() => handleStepPlus()}
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
        <button
          className="border-2 p-4 my-7 bg-red-400"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default DayCounterBis
