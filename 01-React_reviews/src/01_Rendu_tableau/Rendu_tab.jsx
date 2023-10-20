// Rendu de tableaux

const skills = ['HTML', 'CSS', 'JS', 'REACT', 'ANGULAR']

export function MesSkills() {
  return <ul>{skills.map((skill) => skill)}</ul>
}

export function MesSkills1() {
  // Générer l'index automatiquement
  return (
    <ul>
      {skills.map((skill, index) => (
        <li key={index}>
          {skill} est à l&apos;index {index + 1}
        </li>
      ))}
    </ul>
  )
}

// Générer la clé générée dynamiquement par une propriété de l’objet
const skills2 = [
  { id: 'e313', value: 'HTML' },
  { id: 'f980', value: 'CSS' },
  { id: '11eb', value: 'JS' },
  { id: '9a03', value: 'REACT' },
  { id: '65d4', value: 'ANGULAR' },
]

export const MesSkills2 = () => (
  <ul>
    {skills2.map((skill2) => (
      <li key={skill2.id}>
        key={skill2.id} est l&apos;index de {skill2.value}
      </li>
    ))}
  </ul>
)
