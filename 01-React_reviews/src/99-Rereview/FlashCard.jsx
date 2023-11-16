import React, { useState } from 'react'
import './data/flashcard.css'

const questions = [
  {
    id: 3457,
    question: 'What language is React based on?',
    answer: 'JavaScript',
  },
  {
    id: 7336,
    question: 'What are the building blocks of React apps?',
    answer: 'Components',
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: 'JSX',
  },
  {
    id: 1297,
    question: 'How to pass data from parent to child components?',
    answer: 'Props',
  },
  {
    id: 9103,
    question: 'How to give components memory?',
    answer: 'useState hook',
  },
  {
    id: 2002,
    question:
      'What do we call an input element that is completely synchronised with state?',
    answer: 'Controlled element',
  },
]

const FlashCard = () => {
  const [selectedId, setSelectedId] = useState(2002)

  const handleClick = (id) => {
    setSelectedId(id === selectedId ? null : id)
  }
  return (
    <div>
      <div>TODO</div>
      <div className="flashcards">
        {questions.map((question) => (
          <div key={question.id} className="flashcard">
            <button
              className="flashcard__question"
              onClick={() => handleClick(question.id)}
            >
              {question.id === selectedId ? (
                <div className={question.id === selectedId ? 'selected' : ''}>
                  Answer : {question.answer}
                </div>
              ) : (
                <div className="flashcard__question">
                  Question : {question.question}
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FlashCard
