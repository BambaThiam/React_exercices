// Les States
// http://localhost:3000/alone/exercise/08.js

// import * as React from 'react'

// 🐶 Créé un fonction 'addSkillPython' qui ajoute le skill Python
// 🤖 skills.push({id:'xxxx', value: 'Python'})
// 🤖 Utilise {id:`${Math.random()}` pour générer un id aléatoire
// 🐶 dans la fonction 'addSkillPython' logue le tableau skills
// 🤖 console.log('skills',skills)

const skills = [
  { id: 'e313', value: 'HTML' },
  { id: 'f980', value: 'CSS' },
  { id: '11eb', value: 'JS' },
  { id: '9a03', value: 'REACT' },
  { id: '65d4', value: 'ANGULAR' },
]

const addSkillPython = () => {
  skills.push({
    id: `${Math.trunc(Math.random(1, 1001) * 1000)}`,
    value: 'Python',
  })
  console.log('skills', skills)
}

// addSkillPython()
// console.log('skills', skills)

// 🐶 Créé un button dans le render et sur l'evenement onclick passer la fonction 'addSkillPython'
// 🤖 <button onClick={addSkillPython}
function MesSkills() {
  return (
    <>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>{skill.value}</li>
        ))}
      </ul>
      <button onClick={addSkillPython}>Ajout de skill</button>
    </>
  )
}

function App() {
  return <MesSkills />
}

export default App
