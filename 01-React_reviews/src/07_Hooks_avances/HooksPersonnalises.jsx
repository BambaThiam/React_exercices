import React, { useEffect, useReducer, useState } from 'react'
import {
  MarvelPersoView,
  fetchMarvelById,
  fetchMarvelsList,
  fetchMarvel,
  MarvelSearchForm,
  ErrorDisplay,
} from '../06_Hooks/marvel'
import { ErrorBoundary } from 'react-error-boundary'

const useMarvelExists = (marvelName) => {
  const [marvelExists, setMarvelExists] = useState(false)
  //const [error, setError] = useState(null)

  useEffect(() => {
    if (!marvelName) {
      return
    }
    //setMarvelExists(false)
    fetchMarvel(marvelName)
      .then(() => setMarvelExists(true))
      .catch(() => setMarvelExists(false))
  }, [marvelName])

  return marvelExists
}

const Marvel = ({ marvelName }) => {
  const marvelExists = useMarvelExists(marvelName)
  return (
    <div> {marvelExists ? `Le marvel existe` : `Le marvel n'existe pas`}</div>
  )
}

const useFindMarvelByName = (marvelName) => {
  const [marvel, setMarvel] = useState()
  const [error, setError] = useState(null)
  //Autre méthode avec reducer
  const [state, dispatch] = useReducer(reducer, {
    marvel: null,
    error: null,
  })

  useEffect(() => {
    if (!marvelName) {
      return
    }

    fetchMarvel(marvelName)
      .then((marvel) => setMarvel(marvel))
      .catch((error) => setError(error))
  }, [marvelName])

  return [marvel, error]
}

const FindMarvel = ({ marvelName }) => {
  const [marvel, error] = useFindMarvelByName(marvelName)
  if (error) {
    throw error
  }
  return (
    <div>
      {' '}
      {marvel
        ? `Le marvel existe, son nom est : ${marvel.name}`
        : `Le marvel n'existe pas`}
    </div>
  )
}

const reducer = (state, action) => ({ ...state, ...action })
const useFindMarvelByNameReduce = (marvelName) => {
  //Autre méthode avec reducer
  const [state, dispatch] = useReducer(reducer, {
    marvel: null,
    error: null,
  })

  useEffect(() => {
    if (!marvelName) {
      return
    }

    fetchMarvel(marvelName)
      .then((marvel) => dispatch({ marvel }))
      .catch((error) => dispatch({ error }))
  }, [marvelName])

  return state
}

const FindMarvelReduce = ({ marvelName }) => {
  const state = useFindMarvelByNameReduce(marvelName)
  const { marvel, error } = state
  if (error) {
    throw error
  }
  return (
    <div>
      {' '}
      {marvel ? <MarvelPersoView marvel={marvel} /> : `Le marvel n'existe pas`}
    </div>
  )
}

// Avec Reducer & Payload
const reducer1 = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { marvel: null, error: null }
    case 'DONE':
      return { marvel: action.payload, error: null }
    case 'FAIL':
      return { marvel: null, error: action.error }
    default:
      throw new Error('Action non supportée')
  }
}
const useFindMarvelByNameReducePayload = (marvelName) => {
  //Autre méthode avec reducer & Payload
  const [state, dispatch] = useReducer(reducer1, {
    marvel: null,
    error: null,
  })

  useEffect(() => {
    if (!marvelName) {
      return
    }
    dispatch({ type: 'FETCHING' })
    fetchMarvel(marvelName)
      .then((marvel) => dispatch({ type: 'DONE', payload: marvel }))
      .catch((error) => dispatch({ type: 'FAIL', error }))
  }, [marvelName])

  return state
}

const FindMarvelReducePayload = ({ marvelName }) => {
  const state = useFindMarvelByNameReducePayload(marvelName)
  const { marvel, error } = state
  if (error) {
    throw error
  }
  return (
    <div>
      {' '}
      {marvel ? <MarvelPersoView marvel={marvel} /> : `Le marvel n'existe pas`}
    </div>
  )
}

// Gérer le chargement avec un status
const reducer2 = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'FETCHING', marvel: null, error: null }
    case 'DONE':
      return { status: 'DONE', marvel: action.payload, error: null }
    case 'FAIL':
      return { status: 'FAIL', marvel: null, error: action.error }
    default:
      throw new Error('Action non supportée')
  }
}
const useFindMarvelByNameReducePayloadStatut = (marvelName) => {
  //Autre méthode avec reducer & Payload
  const [state, dispatch] = useReducer(reducer2, {
    marvel: null,
    error: null,
    status: 'IDLE',
  })

  useEffect(() => {
    if (!marvelName) {
      return
    }
    dispatch({ type: 'FETCHING' })
    fetchMarvel(marvelName)
      .then((marvel) => dispatch({ type: 'DONE', payload: marvel }))
      .catch((error) => dispatch({ type: 'FAIL', error }))
  }, [marvelName])

  return state
}

const FindMarvelReducePayloadStatut = ({ marvelName }) => {
  const state = useFindMarvelByNameReducePayloadStatut(marvelName)
  const { marvel, error, status } = state
  if (error) {
    throw error
  } else if (status === 'IDLE') {
    return 'Enter un nom de Marvel'
  } else if (status === 'FETCHING') {
    return 'chargement en cours ...'
  } else if (status === 'DONE') {
    return <MarvelPersoView marvel={marvel} />
  }
}

// Fetch générique
const reducer3 = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { status: 'FETCHING', data: null, error: null }
    case 'DONE':
      return { status: 'DONE', data: action.payload, error: null }
    case 'FAIL':
      return { status: 'FAIL', data: null, error: action.error }
    default:
      throw new Error('Action non supportée')
  }
}
const useFindMarvelNameFetch = (search, fetch) => {
  //Autre méthode avec reducer & Payload
  const [state, dispatch] = useReducer(reducer3, {
    marvel: null,
    error: null,
    status: 'IDLE',
  })

  useEffect(() => {
    if (!search) {
      return
    }
    dispatch({ type: 'FETCHING' })
    fetch(search)
      .then((result) => dispatch({ type: 'DONE', payload: result }))
      .catch((error) => dispatch({ type: 'FAIL', error }))
  }, [fetch, search])

  return state
}

function useFindMarvelByNameBis(marvelName) {
  return useFindMarvelNameFetch(marvelName, fetchMarvel)
}

function useFindMarvelList(marvelName) {
  return useFindMarvelNameFetch(marvelName, fetchMarvelsList)
}

const FindMarvelFetchGenerique = ({ marvelName }) => {
  const state = useFindMarvelByNameBis(marvelName)
  const { data: marvel, error, status } = state
  if (error) {
    throw error
  } else if (status === 'IDLE') {
    return 'Enter un nom de Marvel'
  } else if (status === 'FETCHING') {
    return 'chargement en cours ...'
  } else if (status === 'DONE') {
    return <MarvelPersoView marvel={marvel} />
  }
}

const MarvelList = ({ marvelName }) => {
  const state = useFindMarvelList(marvelName)
  const { data: marvels, error, status } = state
  if (error) {
    throw error
  } else if (status === 'IDLE') {
    return 'Enter un nom de Marvel'
  } else if (status === 'FETCHING') {
    return 'chargement en cours ...'
  } else if (status === 'DONE') {
    return (
      <>
        {marvels.map((marvel) => (
          <div key={marvel.id}>
            <hr style={{ background: 'grey' }} />
            <MarvelPersoView marvel={marvel} />
          </div>
        ))}
      </>
    )
  }
}

const HooksPersonnalises = () => {
  const [marvelName, setMarvelName] = useState('')
  const [searchList, setSearchList] = useState(false)
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
      <h6>
        ------------------Hooks Personnalisés : Logique
        réutilisable-------------------
      </h6>
      <div>
        <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <Marvel marvelName={marvelName} />
          </ErrorBoundary>
        </div>
        <h6>
          -------------------Hook avec Personnage / erreur------------------
        </h6>
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <FindMarvel marvelName={marvelName} />
          </ErrorBoundary>
        </div>
        <h6>-------------------useReducer------------------</h6>
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <FindMarvelReduce marvelName={marvelName} />
          </ErrorBoundary>
        </div>
        <h6>------------------Type d'action et payload-------------------</h6>
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <FindMarvelReducePayload marvelName={marvelName} />
          </ErrorBoundary>
        </div>
        <h6>
          ------------------Gérer le chargement avec un
          status-------------------
        </h6>
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            <FindMarvelReducePayloadStatut marvelName={marvelName} />
          </ErrorBoundary>
        </div>
        <h6>------------------Fetch générique-------------------</h6>
        <h6>
          Dans cet exercice il va falloir créer un hook `useFindMarvelList` qui
          utilise la fonction `fetchMarvelsList` (à importer depuis `marvel.js`)
          et la passe en paramètre de `useFetchData`. Ce hook sera appelé depuis
          un nouveau composant `MarvelList`. Ajouter une `checkBox` avec un
          state `searchList` et conditionner l'affichage.
        </h6>
        <label>
          <input
            type="checkbox"
            checked={searchList}
            onChange={(e) => setSearchList(e.target.checked)}
          />
          Chercher dans une liste ?
        </label>
        <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            {searchList ? (
              <MarvelList marvelName={marvelName} />
            ) : (
              <FindMarvelFetchGenerique marvelName={marvelName} />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default HooksPersonnalises
