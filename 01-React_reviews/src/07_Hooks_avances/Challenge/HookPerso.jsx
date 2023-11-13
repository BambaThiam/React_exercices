import { useEffect, useState } from 'react'

const useMealExist = (mealName) => {
  const [mealExist, setMealExist] = useState(false)

  useEffect(() => {
    if (!mealName) {
      return
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((response) => response.json())

      .then((json) => setMealExist(json.meals !== null))
    console.log(mealExist)
  })

  return mealExist
}

export const FindMeal = ({ mealName }) => {
  const mealExist = useMealExist(mealName)
  return (
    <div>
      {mealExist ? (
        <div>{mealName} existe</div>
      ) : (
        <div>Aucun plat trouvé...</div>
      )}
    </div>
  )
}
