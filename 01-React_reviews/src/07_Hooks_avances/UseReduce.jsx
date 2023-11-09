import React, { useReducer } from 'react'

// 🐶 retourne la bonne valeur dans le 'reducer'
// On veut avoir le meme comportement que 'useState'
// la valeur retournée du 'reducer' doit etre le nouveau 'state'
const reducer = (prevState, newState) => {
  return newState
}

function Compteur() {
  const [count, setCount] = useReducer(reducer, 0)
  // 🐶 Utilise le state `count` pour la value du input
  // 🐶 Utilise `setCount(count + 1)` pour le 'onClick'
  return (
    <div>
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

const UseReduce = () => {
  return (
    <div>
      <h6>
        Dans ce premier exercice tu vas devoir reproduire le comportement du
        hook `useState` en utilisant `useReducer`. C'est à dire que veut le même
        comportement sur ces 2 hooks.
      </h6>
      <h6>-------------------------------------</h6>
      <Compteur />
    </div>
  )
}

export default UseReduce
