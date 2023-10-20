// Hook useEffect
// http://localhost:3000/alone/exercise/02.js

import * as React from 'react'
import { useState, useEffect } from 'react'

// 🐶 Corrige l'erreur grâce à useEffect

export function LoginUseEffet({ initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail)
  const handleChange = async (event) => setEmail(event.target.value)

  // 🐶 Créé un Hook useEffect
  // 🤖 React.useEffect(() => { ... })
  useEffect(() => {
    console.log('Email Value', document.getElementById('email').value)
  }, [email])

  // ⛏️ Supprime ce code et insère le dans useEffect
  // console.log('Email Value', document.getElementById('email').value)

  return (
    <div>
      <form>
        <label>Entrez votre email : </label>
        <input id="email" value={email} onChange={handleChange} />
      </form>
    </div>
  )
}
