// 👨‍✈️ Nous voulons afficher dans le composant Content, l'ordinateur préféré

import { useState } from 'react'

// 🐶 accepte `computer` et `onComputerChange` en props de ce composant
export function MyBestComputer({ computer, onComputerChange }) {
  // ⛏️ supprime ce state il sera géré dans le composant parent.
  //const [computer, setComputer] = useState('MacBookPro')
  return (
    <div>
      <label>Mon ordinateur préféré : </label>
      <input
        value={computer}
        // 🐶 remplace `setComputer` par `onComputerChange`
        onChange={(event) => onComputerChange(event.target.value)}
      />
    </div>
  )
}

export function UserName({ userName, onUserNameChange }) {
  return (
    <div>
      <label>Nom d&apos;utilisateur : </label>
      <input
        value={userName}
        onChange={(event) => onUserNameChange(event.target.value)}
      />
    </div>
  )
}

// 🐶 accepte `computer` en props
export function Content({ userName, computer }) {
  return (
    <div>
      Ton nom d&apos;utilisateur est <b>{userName}</b> et ton ordinateur préféré
      est <b>{computer}</b>
    </div>
  )
}
export function ContentBis({ computer }) {
  return (
    <div>
      Ton ordinateur préféré est <b>{computer}</b>
    </div>
  )
}
export function LiftingState() {
  // 🐶 ajoute useState 'computer'
  const [userName, setUserName] = useState('')
  const [computer, setComputer] = useState('MacBookPro')
  return (
    <div>
      {/* 🐶 passe computer et onComputerChange en props */}
      <MyBestComputer computer={computer} onComputerChange={setComputer} />
      <UserName userName={userName} onUserNameChange={setUserName} />
      {/* 🐶 passe le prop computer ici */}
      <Content userName={userName} computer={computer} />
      <ContentBis computer={computer} />
    </div>
  )
}
