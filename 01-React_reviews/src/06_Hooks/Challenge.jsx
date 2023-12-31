//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

import { useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const FetchMeal = ({ mealName }) => {
  const [meal, setMeal] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    if (!mealName) {
      return
    }
    setMeal([])

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((response) => response.json())
      .then((json) => setMeal(json))
      .catch((error) => setError(error))
  }, [mealName])

  if (!mealName) {
    return <div>Entrer un nom de plat</div>
  }

  if (error) {
    throw error
  }
  // console.log('les plats', meal?.meals)
  return meal?.meals ? (
    <div>
      {meal?.meals.map((item) => (
        <div key={item.idMeal}>
          <img src={item.strMealThumb} alt={item.strMeal} />
          <div>Catégorie : {item.strCategory}</div>
          <div>Pays : {item.strArea}</div>
          <div>Catégorie : {item.strCategory}</div>
          <a href={item.strYoutube}>Youtube</a>
        </div>
      ))}
    </div>
  ) : (
    <div>Rien trouvé ...</div>
  )
}

function ErrorDisplay({ error }) {
  return (
    <div style={{ color: 'red' }}>
      Une erreur est survenue lors de la recherche de plat detail :{' '}
      <pre style={{ color: 'grey' }}> Détail : {error.message}</pre>
    </div>
  )
}

const InputSearch = ({ setMeal }) => {
  let searchTimeOut
  const handleSearch = (mealSearch) => {
    if (searchTimeOut) clearTimeout(searchTimeOut) // nettoyage du searchTimeOut
    searchTimeOut = setTimeout(() => {
      setMeal(mealSearch)
      console.log('test')
    }, 2000)
  }
  return (
    <input
      type="text"
      // value={mealName}
      onChange={(event) => handleSearch(event.target.value)}
      className="border-2 border-sky-300"
    />
  )
}
const Challenge = () => {
  const [mealName, setMealName] = useState('')

  return (
    <div>
      <h6>Challenge Hooks</h6>
      <ul>
        <li>Api</li>
        <li>Rendu avec recherche</li>
        <li>Gestions erreur</li>
      </ul>
      <h6>-------------------------------------</h6>
      <div>
        <div>
          <ErrorBoundary key={mealName} FallbackComponent={ErrorDisplay}>
            <InputSearch setMeal={setMealName} />
            <FetchMeal mealName={mealName} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default Challenge
