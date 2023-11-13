import React from 'react'
import UseReduce from './UseReduce'
import HooksPersonnalises from './HooksPersonnalises'
import UseCallback from './useCallback'
import UseContext from './UseContext'
import ChallengeHooksAvances from './Challenge/ChallengeHook'

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
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Hooks personnalisés
          </h4>
          <HooksPersonnalises />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            UseCallback
          </h4>
          <UseCallback />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            UseContext
          </h4>
          <UseContext />
          <h4 className="underline decoration-pink-500 bg-indigo-300 w-1/2 rounded-lg p-2 font-bold">
            Challenge Hooks Avancés
          </h4>
          <ChallengeHooksAvances />
        </div>
      </div>
    </>
  )
}

export default HooksAvances
