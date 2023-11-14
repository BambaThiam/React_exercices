import React from 'react'
import PizzaMenu from './PizzaMenu'
import Step from './Step'

const Rereview = () => {
  return (
    <>
      <div className="m-10 flex flex-col gap-10 border-2 m-4 p-4">
        <h3 className="text-3xl m-4 underline decoration-sky-500 ">
          Rereview base react
        </h3>
        <div className="flex flex-col gap-4">
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Pizza Menu
          </h4>
          <PizzaMenu />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Step
          </h4>
          <Step />
        </div>
      </div>
    </>
  )
}

export default Rereview
