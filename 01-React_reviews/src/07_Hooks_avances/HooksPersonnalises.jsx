import React, { useEffect, useState } from 'react'
import {
  MarvelPersoView,
  fetchMarvel,
  MarvelSearchForm,
} from '../06_Hooks/marvel'
import { ErrorBoundary } from 'react-error-boundary'

const useMarvelExists = (marvelName) => {
  const [marvelExists, setMarvelExists] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!marvelExists) {
      return
    }
    setMarvelExists(false)
    fetchMarvel(marvelName)
      .then(() => setMarvelExists(true))
      .catch((error) => setError(false))
  }, [])

  return marvelExists

  //   if (!marvelName) {
  //     return <div>Entrer un nom de personnage Marvel</div>
  //   }

  //   if (error) {
  //     throw error
  //   }

  //   if (!marvelExists) {
  //     return <div>chargement ...</div>
  //   }

  //   return (
  //     <div>
  //       <MarvelPersoView marvel={marvelExists} />
  //     </div>
  //   )
}

const Marvel = ({ marvelName }) => {
  const marvelExists = useMarvelExists(marvelName)
  return (
    <div> {marvelExists ? `Le marvel existe` : `Le marvel n'existe pas`}</div>
  )
}

function ErrorDisplay({ error }) {
  return (
    <div style={{ color: 'red' }}>
      Une erreur est survenue lors de la recherche de Marvel detail :{' '}
      <pre style={{ color: 'grey' }}> Détail : {error.message}</pre>
    </div>
  )
}

const HooksPersonnalises = () => {
  const [marvelName, setMarvelName] = useState('')
  const handleSearch = (name) => {
    setMarvelName(name)
  }
  return (
    <div>
      <h6>
        1- Dans cet exercice nous allons reprendre les appels aux API REST de
        Marvel et construire nos propres Hooks Personnalisés. Commençons par un
        Hook simple qui nous permettrais de savoir si un personnage Marvel exist
        que l'on pourrait utiliser comme cela.
      </h6>
      <h6>-------------------------------------</h6>
      <div>
        <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <Marvel marvelName={marvelName} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default HooksPersonnalises
