import React from 'react'
import UseReduce from './UseReduce'

const HooksAvances = () => {
  return (
    <>
      <div className="m-10 flex flex-col gap-10 border-2 m-4 p-4">
        <h3 className="text-3xl m-4 underline decoration-sky-500 ">
          Les Hooks avancés
        </h3>
        <div className="flex flex-col gap-4">
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            UseReduce
          </h4>
          <UseReduce />
        </div>
      </div>
    </>
  )
}

export default HooksAvances
