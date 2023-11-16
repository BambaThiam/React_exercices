import React from 'react'
import PizzaMenu from './PizzaMenu'
import Step from './Step'
import StepOpen from './StepOpen'
import DayCounter from './DayCounter'
import TravelList from './TravelList'
import FlashCard from './FlashCard'

const Rereview = () => {
  return (
    <>
      <div className="m-10 flex flex-col gap-10 border-2 m-4 p-4">
        <h1>Rereview base react</h1>
        <div className="flex flex-col gap-4">
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Pizza Menu
          </h4>
          <PizzaMenu />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Step
          </h4>
          <Step />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Step Open / Close
          </h4>
          <StepOpen />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Day Counter
          </h4>
          <DayCounter />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Travel List APP
          </h4>
          <TravelList />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Flash Card APP
          </h4>
          <FlashCard />
        </div>
      </div>
    </>
  )
}

export default Rereview
