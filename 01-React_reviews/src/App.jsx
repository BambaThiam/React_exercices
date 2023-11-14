import React from 'react'
import Patterns_Courant from './05_Patterns_courants/Patterns_Courant'
import Hooks from './06_Hooks/Hooks'
import UseEffetHTTP1 from './06_Hooks/UseEffetHTTP1'
import HooksAvances from './07_Hooks_avances/HooksAvances'
import PatternsAvances from './08_Patterns_avances/PatternsAvances'
import Rereview from './99-Rereview/Rereview'

function App() {
  return (
    <>
      <div>
        <div>
          <h1 className="text-9xl font-bold">React Tuto</h1>
        </div>
        <Patterns_Courant />
        <Hooks />
        <HooksAvances />
        <PatternsAvances />
      </div>
      <div>
        <Rereview />
      </div>
    </>
  )
}

export default App
