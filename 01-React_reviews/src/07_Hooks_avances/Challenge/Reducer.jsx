import { useContext, useEffect, useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { meal: null, error: null }
    case 'DONE':
      return { meal: action.meal, error: null }
    case 'ERROR':
      return { meal: null, error: action.error }
  }
}

export const useFindMeal = (mealName) => {
  const [state, dispatch] = useReducer(reducer, {
    meal: null,
    error: null,
  })

  useEffect(() => {
    if (!mealName) {
      return
    }
    dispatch({ type: 'FETCHING' })
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((response) => response.json())
      .then((json) => dispatch({ type: 'DONE', meal: json }))
      .catch((error) => dispatch({ type: 'ERROR', error }))
  }, [mealName])

  return state
}

export const FindMealReduce = ({ mealName }) => {
  const { meal, error } = useFindMeal(mealName)
  if (error) {
    throw error
  }
  return (
    <div>
      {' '}
      {meal ? (
        <div>
          {meal.meals.map((item) => (
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
        'Plat non trouvé...'
      )}
    </div>
  )
}
