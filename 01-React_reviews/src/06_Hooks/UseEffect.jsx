// Hook useEffect
// http://localhost:3000/alone/exercise/02.js

import * as React from 'react'
import { useState, useEffect } from 'react'

// 🐶 Corrige l'erreur grâce à useEffect

export function LoginUseEffet({ initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail)
  const handleChange = async (event) => setEmail(event.target.value)
  const [password, setPasseword] = useState('')
  const handlePasswordChange = async (event) => setEmail(event.target.value)

  // 🐶 Créé un Hook useEffect
  // 🤖 React.useEffect(() => { ... })

  // Est déclanché lorsque le composant est rendu et à l'infini
  useEffect(() => {
    console.log('Email Value', document.getElementById('email').value)
  })

  // Est déclanché lorsque l'email change (dépendance d'effets)
  useEffect(() => {
    console.log('localStorage')
    window.localStorage.setItem('email', email)
  }, [email])

  // Est déclanché lorsque le props initialEmail change (dépendance d'effets sur props)
  useEffect(() => {
    console.log('localStorage initialEmail (props a changé)')
    window.localStorage.setItem('email', initialEmail)
  }, [initialEmail])

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

export function Depend_Props() {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return <LoginUseEffet initialEmail={`example-${count}@example.com`} />
}