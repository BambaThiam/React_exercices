// Les formulaires
// http://localhost:3000/alone/exercise/08.js

import { useState } from 'react'

// import * as React from 'react'

export function LoginForm() {
  // 🐶 Gère l'événement onSubmit de <form> en créant une fonction 'handleSubmit'
  // 🤖 <form onSubmit={handleSubmit}>
  // 🤖 Utilise `event.preventDefault()` dans la fonction handleSubmit pour stopper
  // le comportement par defaut du formulaire (soumission et rafraichissement page)

  // 🐶 Affiche ensuite une popup Bonjour 'email@email.fr'
  // 🤖 Utilise `event.target.elements.emailInput.value` pour récupèrer la valeur de l'email

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    // console.log(setEmail(event.target.value))
    // setError(email.includes('@') ? null : "L'email est incorrect")
    setError(event.target.value.includes('@') ? null : "L'email est incorrect")
    setEmail(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const message = alert(`Bonjour ${email}`)
    return message
  }

  return (
    <form className="flex flex-row p-4 gap-4" onSubmit={handleSubmit}>
      <label>
        Adresse email :
        <input
          type="text"
          name="emailInput"
          value={email}
          onChange={handleChange}
          className="border-2"
        />
      </label>
      <div>{error}</div>
      <input
        type="submit"
        value="Connexion"
        className="border-2 rounded-lg bg-stone-300 cursor-pointer"
      />
      <div></div>
    </form>
  )
}

// function App() {
//   return <LoginForm />
// }

// export default App
