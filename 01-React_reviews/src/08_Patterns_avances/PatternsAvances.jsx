import React from 'react'
import ComposantsComposes from './ComposantsComposes'

const PatternsAvances = () => {
  return (
    <>
      <div className="m-10 flex flex-col gap-10 border-2 m-4 p-4">
        <h1>Les Patterns avancés</h1>
        <div className="flex flex-col gap-4">
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Les composants composés
          </h4>
          <ComposantsComposes />
        </div>
      </div>
    </>
  )
}

export default PatternsAvances
