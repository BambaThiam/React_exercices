import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  MarvelPersoView,
  fetchMarvelsList,
  fetchMarvel,
  MarvelSearchForm,
  ErrorDisplay,
} from '../06_Hooks/marvel'

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { status: 'fetching', data: null, error: null }
    case 'done':
      return { status: 'done', data: action.payload, error: null }
    case 'fail':
      return { status: 'fail', data: null, error: action.error }
    default:
      throw new Error('Action non supporté')
  }
}

// ⛏️ supprime 'search' il sera extrait dans 'useCallback' plus tard
// 🐶 renomme 'fetch' en 'callback' pour plus de clarté
function useFetchData(callback) {
  const [state, dispatch] = useReducer(reducer, {
    data: null,
    error: null,
    status: 'idle',
  })

  useEffect(() => {
    // 🐶 fais un appel à la fonction 'callback' (qui retoune une 'promise')
    // 🤖 const promise = callback()
    const promise = callback()

    // 🐶 sors de la fonction si  'promise' n'est pas défini
    if (!promise) {
      return
    }
    dispatch({ type: 'fetching' })

    // ⛏️ supprime `fetch(search)` et utilise `promise`
    promise
      .then((marvel) => dispatch({ type: 'done', payload: marvel }))
      .catch((error) => dispatch({ type: 'fail', error }))
    // 🐶 adapte les dépendances pour que le useEffect ne s'excute sur la modification de 'callback'
  }, [callback])

  return state
}

// 🐶 Modifie ce hook pour qu'il passe une fonction mémoïsé à 'useFetchData'
function useFindMarvelList(marvelName) {
  // 🐶 créé un callback avec `React.useCallback`
  // 🤖 const cb = React.useCallback(param1, param2)
  // 1. param1 est une fonction qui :
  //    - retourne rien si 'marvelName' n'est pas défini
  //    - return fetchMarvel(marvelName) si 'marvelName' n'est pas défini
  // 2. param2 les dépendances (marvelName dans ce cas)
  const cb = useCallback(() => {
    if (!marvelName) {
      return
    }
    return fetchMarvelsList(marvelName)
  }, [marvelName])

  // ⛏️ supprime le paramètre 'marvelName'
  // 🐶 passe le callback à 'useFetchData'
  return useFetchData(cb)
}

// 🐶 Modifie ce hook pour qu'il passe une fonction mémoïsé à 'useFetchData'
function useFindMarvelByName(marvelName) {
  // 🐶 réptète l'opération
  const cb = useCallback(() => {
    if (!marvelName) {
      return
    }
    return fetchMarvel(marvelName)
  }, [marvelName])
  return useFetchData(cb)
}

function Marvel({ marvelName }) {
  const state = useFindMarvelByName(marvelName)
  const { data: marvel, error, status } = state
  if (status === 'fail') {
    throw error
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return <MarvelPersoView marvel={marvel} />
  }
}

function MarvelList({ marvelName }) {
  const state = useFindMarvelList(marvelName)
  const { data: marvels, error, status } = state
  if (status === 'fail') {
    throw error
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return (
      <>
        {marvels.map((marvel) => {
          return (
            <div key={marvel.id}>
              <hr style={{ background: 'grey' }} />
              <MarvelPersoView marvel={marvel} />
            </div>
          )
        })}
      </>
    )
  }
}

// Retourner un callback --------------------

const reducer1 = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return { status: 'fetching', data: null, error: null }
    case 'done':
      return { status: 'done', data: action.payload, error: null }
    case 'fail':
      return { status: 'fail', data: null, error: action.error }
    default:
      throw new Error('Action non supporté')
  }
}

function useFetchData1() {
  const [state, dispatch] = useReducer(reducer1, {
    data: null,
    error: null,
    status: 'idle',
  })

  const { data, error, status } = state

  const execute = useCallback((promise) => {
    dispatch({ type: 'fetching' })
    promise
      .then((marvel) => dispatch({ type: 'done', payload: marvel }))
      .catch((error) => dispatch({ type: 'fail', error }))
  }, [])

  //   return { ...state, execute }
  return { data, error, status, execute }
}

function useFindMarvelList1(marvelName) {
  const { data, error, status, execute } = useFetchData1()
  useEffect(() => {
    if (!marvelName) {
      return
    }
    execute(fetchMarvelsList(marvelName))
  }, [marvelName, execute])

  return { data, error, status }
}

function useFindMarvelByName1(marvelName) {
  // 🐶 réptète l'opération
  const { data, error, status, execute } = useFetchData1()
  useEffect(() => {
    if (!marvelName) {
      return
    }
    execute(fetchMarvel(marvelName))
  }, [marvelName, execute])
  return { data, error, status }
}

function Marvel1({ marvelName }) {
  const state = useFindMarvelByName1(marvelName)

  const { data: marvel, error, status } = state
  if (status === 'fail') {
    throw error
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return <MarvelPersoView marvel={marvel} />
  }
}

function MarvelList1({ marvelName }) {
  const state = useFindMarvelList1(marvelName)
  const { data: marvels, error, status } = state
  if (status === 'fail') {
    throw error
  } else if (status === 'idle') {
    return 'enter un nom de Marvel'
  } else if (status === 'fetching') {
    return 'chargement en cours ...'
  } else if (status === 'done') {
    return (
      <>
        {marvels.map((marvel) => {
          return (
            <div key={marvel.id}>
              <hr style={{ background: 'grey' }} />
              <MarvelPersoView marvel={marvel} />
            </div>
          )
        })}
      </>
    )
  }
}

const UseCallback = () => {
  const [marvelName, setMarvelName] = useState('')
  const [searchList, setSearchList] = useState('')
  const handleSearch = (name) => {
    setMarvelName(name)
  }
  return (
    <div>
      <h6>
        1- Dans cet exercice tu vas devoir optimiser les hooks
        `useFindMarvelList` et `useFindMarvelByName` avec `useCallBack`. Mais
        juste avant modifions `useFetchData` en extrayant le terme de recheche :
        `search` que nous allons déplacer dans le `useCallback.`
      </h6>
      <h6>------------------UseCallback-------------------</h6>
      <div>
        <label>
          <input
            type="checkbox"
            checked={searchList}
            onChange={(e) => setSearchList(e.target.checked)}
          />{' '}
          Chercher une liste ?
        </label>
        <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
        <div className="marvel-detail">
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            {searchList ? (
              <MarvelList marvelName={marvelName} />
            ) : (
              <Marvel marvelName={marvelName} />
            )}
          </ErrorBoundary>
        </div>
      </div>
      <h6>
        2- Au lieu d'avoir a gérer de nombreuses fois le `useCallback` dans les
        hooks spécifiques (`useFindMarvelList` et `useFindMarvelByName`), et
        exécuter les appels de fonctions dans `useFetchData`, nous voudrions
        faire l'inverse. C'est a dire exécuter les fonctions dans les hooks
        spécifiques et que la mémoïsation via `useCallback` se fasse au niveau
        de `useFetchData`. _Au passage il faudra déplacer le `useEffect` dans
        les hooks spécifiques._
      </h6>
      <h6>------------------Retourner un callback-------------------</h6>
      <div>
        <label>
          <input
            type="checkbox"
            checked={searchList}
            onChange={(e) => setSearchList(e.target.checked)}
          />{' '}
          Chercher une liste ?
        </label>
        <MarvelSearchForm marvelName={marvelName} onSearch={handleSearch} />
        <div>
          <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
            {searchList ? (
              <MarvelList1 marvelName={marvelName} />
            ) : (
              <Marvel1 marvelName={marvelName} />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default UseCallback
