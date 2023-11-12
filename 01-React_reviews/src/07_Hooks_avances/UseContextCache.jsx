import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import {
  MarvelPersoView,
  fetchMarvelById,
  fetchMarvelsList,
  fetchMarvel,
  MarvelSearchForm,
  ErrorDisplay,
} from '../06_Hooks/marvel'

// 🐶 Créé un context 'MarvelCacheContext' avec `React.createContext()`

const MarvelCacheContext = createContext()

// 🐶 Créé un reducer 'marvelCacheReducer' pour gérer les données en cache
const marvelCacheReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MARVEL': {
      return { ...state, [action.marvelName]: action.marvelData }
    }
    case 'ADD_MARVEL_LIST': {
      return { ...state, [`${action.marvelName}-list`]: action.marvelData }
    }
    default: {
      throw new Error(`action impossible: ${action.type}`)
    }
  }
}

// 🐶 Créé un Context Provider 'MarvelCacheProvider'
function MarvelCacheProvider(props) {
  // 🐶 Utlise le 'marvelCacheReducer' avec `React.useReducer`

  const [cache, dispatch] = useReducer(marvelCacheReducer, {})
  // 🐶 Retourne le provider avec les données du reducer
  return <MarvelCacheContext.Provider value={[cache, dispatch]} {...props} />
}

// 🐶 Crée un Context Consumer 'useMarvelCache'
function useMarvelCache() {
  // 🐶 Utlise le contexte 'MarvelCacheContext' avec `React.useContext(MarvelCacheContext)`
  const context = useContext(MarvelCacheContext)
  // 🤖 gère le cas ou 'useMarvelCache' n'est pas utilisé avec le provider
  if (!context) {
    throw new Error('useMarvelCache doit être utilisé avec MarvelCacheProvider')
  }
  return context
}

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

// 🐶 Evolution de 'useFetchData' pour pourvoir mettre à jour les données avec `setData`
function useFetchData() {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    error: null,
    status: 'idle',
  })
  const { data, error, status } = state

  const execute = React.useCallback((promise) => {
    dispatch({ type: 'fetching' })
    promise
      .then((marvel) => dispatch({ type: 'done', payload: marvel }))
      .catch((error) => dispatch({ type: 'fail', error }))
  }, [])

  // 🐶 Dans le cas où l'on n'appelle pas d'API Rest (execute) on doit
  // pourvoir mettre à jour des données.
  // Pour cela on va retourner un callback 'setData' qui mettra à jour les data.
  // 🤖
  const setData = React.useCallback(
    (data) => dispatch({ type: 'done', payload: data }),
    [dispatch]
  )

  // 🐶 pense à retouner aussi setData pour pouvoir l'utiliser dans les hooks ci-dessous
  return { data, error, status, execute, setData }
}

// 🐶 Fais évoluer ce hook pour gérer le cache
function useFindMarvelList(marvelName) {
  // 🐶 utilise le hook 'useMarvelCache'
  const [cache, dispatch] = useMarvelCache()

  // 🐶 ajoute 'setData'
  const { data, error, status, execute, setData } = useFetchData()

  React.useEffect(() => {
    if (!marvelName) {
      return
    } else if (cache[`${marvelName}-list`]) {
      setData(cache[`${marvelName}-list`])
    } else {
      execute(
        fetchMarvelsList(marvelName).then((marvelData) => {
          dispatch({ type: 'ADD_MARVEL_LIST', marvelName, marvelData })
          return marvelData
        })
      )
    }

    // execute(fetchMarvelsList(marvelName))
    // 🐶 N'oublie pas les nouvelles dépendances de 'useEffect'
  }, [marvelName, execute, setData, cache, dispatch])
  return { data, error, status }
}

// 🐶 Fais évoluer ce hook pour gérer le cache
function useFindMarvelByName(marvelName) {
  const [cache, dispatch] = useMarvelCache()
  const { data, error, status, execute, setData } = useFetchData()
  React.useEffect(() => {
    if (!marvelName) {
      return
    } else if (cache[marvelName]) {
      setData(cache[marvelName])
    } else {
      execute(
        fetchMarvel(marvelName).then((marvelData) => {
          dispatch({ type: 'ADD_MARVEL', marvelName, marvelData })
          return marvelData
        })
      )
    }
    // execute(fetchMarvel(marvelName))
  }, [marvelName, execute, setData, cache, dispatch])
  return { data, error, status, execute }
}

function Marvel({ marvelName }) {
  const state = useFindMarvelByName(marvelName, fetchMarvelById)

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
  const state = useFindMarvelList(marvelName, fetchMarvelById)
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

const UseContextCache = () => {
  const [marvelName, setMarvelName] = React.useState('')
  const [searchList, setSearchList] = React.useState('')
  const handleSearch = (name) => {
    setMarvelName(name)
  }
  return (
    <div>
      <h6>
        1- Dans cet exercice tu vas devoir mettre les données en cache lors d'un
        premier appel d'API sur un nom particulier ex :`fetchMarvel('x-men'`).
        Si un deuxième appel doit être fait avec ce même nom, il faudra lire la
        donnée dans la mémoire cache du contexte plutôt que via l'API Rest.
      </h6>
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
        {/* 🐶 Pense à wrapper avec <MarvelCacheProvider> */}
        <MarvelCacheProvider>
          <div>
            <ErrorBoundary key={marvelName} FallbackComponent={ErrorDisplay}>
              {searchList ? (
                <MarvelList marvelName={marvelName} />
              ) : (
                <Marvel marvelName={marvelName} />
              )}
            </ErrorBoundary>
          </div>
        </MarvelCacheProvider>
      </div>
    </div>
  )
}

export default UseContextCache
