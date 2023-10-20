import React, { useState } from 'react'

export function LoginState() {
  const [email, setEmail] = useState('')
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  return (
    <>
      <div>
        <label>Veuillez saisir votre email </label>
        <input type="text" onChange={handleChange} className="border-2" />
        <h5>Votre email est le suivant : {email}</h5>
      </div>
    </>
  )
}

export function LoginStateProps({ initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail)
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  return (
    <>
      <div>
        <label>Veuillez saisir votre email </label>
        <input
          type="text"
          value={email}
          onChange={handleChange}
          className="border-2"
        />
        <h5>Votre email par défaut est le suivant : {email}</h5>
      </div>
    </>
  )
}

export function LoginStatePropsCheck({ initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState(false)
  const handleChange = (e) => {
    setEmail(e.target.value)
    setError(!e.target.value.includes('@'))
  }
  return (
    <>
      <div>
        <label>Veuillez saisir votre email </label>
        <input
          type="text"
          value={email}
          onChange={handleChange}
          className="border-2"
        />

        <div className={error ? 'text-red-500' : 'text-green-500'}>
          Votre email : {email} est {error ? 'incorrect' : 'correct'}
        </div>
      </div>
    </>
  )
}
