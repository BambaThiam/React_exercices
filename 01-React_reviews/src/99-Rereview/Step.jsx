import React from 'react'
import './data/step.css'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const Step = () => {
  const [step, setStep] = React.useState(1)

  const handlePrevious = () => {
    if (step > 1) {
      return setStep(step - 1)
    }
  }

  const handleNext = () => {
    if (step < 3) {
      return setStep(step + 1)
    }
  }

  return (
    <div className="steps">
      <div className="numbers">
        <div className={`number ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`number ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`number ${step >= 3 && step < 4 ? 'active' : ''}`}>
          3
        </div>
      </div>
      <p className="message">
        {' '}
        Step: {step} {messages[step - 1]}
      </p>
      <div className="buttons">
        <button
          style={{ backgroundColor: '#7950f2', color: 'white' }}
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: '#7950f2', color: 'white' }}
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </div>
  )
}


export default Step
