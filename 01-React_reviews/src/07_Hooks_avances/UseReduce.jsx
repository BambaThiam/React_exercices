import React, { useReducer } from 'react'

const reducer = (prevState, newState) => {
  return newState
}

const reducer1 = (state, action) => {
  // teste action.type
  // applique une opération sur le state (incrémentation etc ...)
  // return le nouveau state
  // ex : return state + 1
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      throw new Error()
  }
}

const reducer2 = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + action.payload
    case 'DECREMENT':
      return state - action.payload
    case 'RESET':
      return 0
    default:
      throw new Error()
  }
}

const reducer3 = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload }
    case 'DECREMENT':
      return { count: state.count - action.payload }
    case 'RESET':
      return { count: 0 }
    default:
      throw new Error()
  }
}

function Compteur() {
  const [count, setCount] = useReducer(reducer, 0)

  return (
    <div>
      <h6>
        1 - Dans ce premier exercice tu vas devoir reproduire le comportement du
        hook `useState` en utilisant `useReducer`. C'est à dire que veut le même
        comportement sur ces 2 hooks.
      </h6>
      <h6>-------------------------------------</h6>
      <input type="text" value="Cliquez ci-après pour augmenter :" />
      <input
        type="button"
        onClick={() => {
          setCount(count + 1)
        }}
        value={count}
        className="border-2 border-sky-300 p-4 m-2"
      />
    </div>
  )
}

function CompteurAction() {
  const [count, setCount] = useReducer(reducer1, 0)

  return (
    <div>
      <h6>
        2 - Dans cet exercice tu vas devoir implémenter le `reducer` pour
        incrémenter/ décrémenter / mettre à zéro le state en fonction du type de
        l'action.
      </h6>
      <h6>-------------------------------------</h6>
      <input type="text" value="Cliquez ci-après :" />
      <input
        type="button"
        onClick={() => {
          setCount({ type: 'INCREMENT' })
        }}
        value={`Incrementer ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => {
          setCount({ type: 'DECREMENT' })
        }}
        value={`Décrementer ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => {
          setCount({ type: 'RESET' })
        }}
        value={`Reset ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
    </div>
  )
}

function CompteurDispatch() {
  const [count, disptach] = useReducer(reducer1, 0)
  const increment = () => {
    disptach({ type: 'INCREMENT' })
  }

  const decrement = () => {
    disptach({ type: 'DECREMENT' })
  }

  const reset = () => {
    disptach({ type: 'RESET' })
  }

  return (
    <div>
      <h6>
        3 - Dans cet exercice tu vas devoir créer et utiliser les 3 fonctions
        `disptach`
      </h6>
      <h6>-------------------------------------</h6>
      <input type="text" value="Cliquez ci-après :" />
      <input
        type="button"
        onClick={() => increment()}
        value={`Incrementer ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => decrement()}
        value={`Décrementer ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => reset()}
        value={`Reset ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
    </div>
  )
}

function CompteurPayload() {
  const [count, disptach] = useReducer(reducer2, 0)
  const increment = (step = 1) => {
    disptach({ type: 'INCREMENT', payload: step })
  }

  const decrement = (step = 1) => {
    disptach({ type: 'DECREMENT', payload: step })
  }

  const reset = () => {
    disptach({ type: 'RESET' })
  }

  return (
    <div>
      <h6>
        4 - Un cas d'utilisation fréquent est de passer une valeur utile
        (`payload`). Par exemple si l'on veut incrémenter de 10. exemple :
        `increment(10)`.
      </h6>
      <h6>-------------------------------------</h6>
      <input type="text" value="Cliquez ci-après :" />
      <input
        type="button"
        onClick={() => increment(10)}
        value={`Incrementer 10 : ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => decrement(5)}
        value={`Décrementer 5 : ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => reset()}
        value={`Reset ${count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
    </div>
  )
}

function CompteurState() {
  const [state, disptach] = useReducer(reducer3, { count: 0 })
  const increment = (step = 1) => {
    disptach({ type: 'INCREMENT', payload: step })
  }

  const decrement = (step = 1) => {
    disptach({ type: 'DECREMENT', payload: step })
  }

  const reset = () => {
    disptach({ type: 'RESET' })
  }

  return (
    <div>
      <h6>
        5 - Au lieu d'avoir une valeur dans le state on pourrait avoir un objet
        (qui contient d'autres valeurs).
      </h6>
      <h6>-------------------------------------</h6>
      <input type="text" value="Cliquez ci-après :" />
      <input
        type="button"
        onClick={() => increment(10)}
        value={`Incrementer 10 : ${state.count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => decrement(5)}
        value={`Décrementer 5 : ${state.count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
      <input
        type="button"
        onClick={() => reset()}
        value={`Reset ${state.count}`}
        className="border-2 border-sky-300 p-4 m-2"
      />
    </div>
  )
}
const UseReduce = () => {
  return (
    <div>
      <Compteur />
      <CompteurAction />
      <CompteurDispatch />
      <CompteurPayload />
      <CompteurState />
    </div>
  )
}

export default UseReduce
