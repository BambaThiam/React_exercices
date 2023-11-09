import React, { useState } from 'react'
import { MarvelPersoView, MarvelSearchForm, fetchMarvel } from './marvel'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const MarvelDetails = ({ marvelName }) => {
  // 🐶 Créé un state pour le personnage marvel
  const [marvel, setMarvel] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!marvelName) {
      return
    }
    setMarvel(null)
    fetchMarvel(marvelName)
      .then((marvel) => setMarvel(marvel))
      .catch((error) => setError(error))
  }, [marvelName])
  // 🐶 retourne (render) 3 choses differentes en fonctions du state et prop
  //  - 'Entrer un nom de personnage Marvel' si `marvelName` n'est pas renseigné
  //  - 'chargement ...' si `marvel` n'est pas renseigné
  //  - <MarvelPersoView marvel={marvel} sinon
  if (!marvelName) {
    return <div>Entrer un nom de personnage Marvel</div>
  }

  if (error) {
    throw error
  }

  if (!marvel) {
    return <div>chargement ...</div>
  }

  return (
    <div>
      <MarvelPersoView marvel={marvel} />
    </div>
  )
  //   return null
}

function ErrorDisplay({ error }) {
  return (
    <div style={{ color: 'red' }}>
      Une erreur est survenue lors de la recherche de Marvel detail :{' '}
      <pre style={{ color: 'grey' }}> Détail : {error.message}</pre>
    </div>
  )
}
const UseEffetHTTP2 = () => {
  const [marvelName, setMarvelName] = useState('')

  const handleSearch = (name) => {
    setMarvelName(name)
  }
  return (
    <div>
      <h6>
        Dans cet exercice il y a un champ input pour rechercher un personnage
        Marvel par son nom et afficher le résultat avec une photo et une liste
        d'épisodes dans lequel le personnage apparait. Ces composants sont déjà
        créés, il n'y a plus qu'a les utiliser. Le but étant de se concentrer
        sur le `useEffect` et `fetchMarvel.` Implémente cela dans cet exercice.
      </h6>
      <h6>-------------------------------------</h6>
      <div>
        <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <MarvelDetails marvelName={marvelName} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default UseEffetHTTP2
