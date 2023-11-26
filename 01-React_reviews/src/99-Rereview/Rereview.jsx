import React from 'react'
import PizzaMenu from './PizzaMenu'
import Step from './Step'
import StepOpen from './StepOpen'
import DayCounter from './DayCounter'
import TravelList from './TravelList'
import FlashCard from './FlashCard'
import DayCounterBis from './DayCounterBis'
import DayCounterTer from './DayCounterTer'
import TravelListBis from './TravelListBis'
import Accordion, { faqs } from './Accordion'
import StepChildProp from './StepChildProp'
import AccordionChildProp from './AccordionChildProp'
import Calculator from './Calculator'

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
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Day Counter Bis
          </h4>
          <DayCounterBis />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Day Counter Ter
          </h4>
          <DayCounterTer />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Travel List APP - Bis : Lifting State
          </h4>
          <TravelListBis />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Accordion
          </h4>
          <Accordion data={faqs} />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Travel List APP - Tier : Composant séparés
          </h4>
          <TravelListBis />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Step Child Prop
          </h4>
          <StepChildProp />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Accordion with Children Prop
          </h4>
          <AccordionChildProp data={faqs} />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Tip Calculator
          </h4>
          <Calculator />
        </div>
      </div>
    </>
  )
}

export default Rereview