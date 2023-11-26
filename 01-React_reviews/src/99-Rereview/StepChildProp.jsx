import React from 'react'
import './data/step.css'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const Button = ({ textColor, bgColor, onClick, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

const StepMessage = ({ step, children }) => {
  return (
    <p className="message">
      <h3>Step: {step}</h3>
      {children}
    </p>
  )
}

const StepChildProp = () => {
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
            <h3>Children Prop- créer un bouton reutilisable</h3>

            <div className="numbers">
              <div className={`number ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className={`number ${step >= 2 ? 'active' : ''}`}>2</div>
              <div
                className={`number ${step >= 3 && step < 4 ? 'active' : ''}`}
              >
                3
              </div>
            </div>
            <StepMessage step={step}>
              {messages[step - 1]}{' '}
              <Button
                textColor="white"
                bgColor="#7950f2"
                onClick={() => alert(`learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </StepMessage>
            <div className="buttons">
              <Button
                textColor="white"
                bgColor="#7950f2"
                onClick={() => handlePrevious()}
              >
                <span>⬅️</span> Previous
              </Button>
              <Button
                textColor="white"
                bgColor="#7950f2"
                onClick={() => handleNext()}
              >
                Next <span>➡️</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StepChildProp
