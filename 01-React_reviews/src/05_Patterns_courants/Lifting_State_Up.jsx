import { useState } from 'react'

export function NameInput({ onNameChange, name }) {
  // ⛏️ supprime le state name
  //   const [name, setName] = useState('')
  const handleChange = (e) => {
    // 🐶 fait appel 'onNameChange' pour faire remonter le state
    // setName(e.target.value)
    onNameChange(e.target.value)
  }
  return (
    <span>
      <label>Name : </label>
      <input type="text" value={name} onChange={handleChange} />
    </span>
  )
}

export function FirstNameInput({ onFirstNameChange, firstName }) {
  //   const [firstName, setFirstName] = useState('')
  const handleChange = (e) => {
    onFirstNameChange(e.target.value)
  }
  return (
    <span>
      <label>FirstName : </label>
      <input type="text" value={firstName} onChange={handleChange} />
    </span>
  )
}
