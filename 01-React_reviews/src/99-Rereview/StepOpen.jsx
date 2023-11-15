import React from 'react'
import './data/step.css'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const StepOpen = () => {
  const [step, setStep] = React.useState(1)
  const [isOpen, setIsOpen] = React.useState(true)

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

  const handleWindow = () => {
    return setIsOpen(!isOpen)
  }

  return (
    <div>
      <button
        className="buttons"
        style={{ backgroundColor: '#7950f2', color: 'white' }}
        onClick={() => handleWindow()}
      >{`${isOpen ? 'Close' : 'Open'}`}</button>{' '}
      <div>
        {isOpen && (
          <div className="steps">
            <h3>Ajout possibilités fermeture fenêtre</h3>

            <div className="numbers">
              <div className={`number ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className={`number ${step >= 2 ? 'active' : ''}`}>2</div>
              <div
                className={`number ${step >= 3 && step < 4 ? 'active' : ''}`}
              >
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
        )}
      </div>
    </div>
  )
}

export default StepOpen
