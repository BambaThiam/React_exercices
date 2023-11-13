//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FindMeal } from './HookPerso'
import { FindMealReduce } from './Reducer'
import { ThemeContext, ThemeProviderContext } from './Context'

function ErrorDisplay({ error }) {
  return (
    <div style={{ color: 'red' }}>
      Une erreur est survenue lors de la recherche de plat detail :{' '}
      <pre style={{ color: 'grey' }}> Détail : {error.message}</pre>
    </div>
  )
}

export const InputSearch = ({ setMeal }) => {
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
      placeholder="Saisir ici..."
      className="border-2 border-sky-300"
    />
  )
}
const ChallengeHooksAvances = () => {
  const [mealName, setMealName] = useState('')

  return (
    <div>
      <h6>Challenge Hooks_avances : </h6>
      <ul>
        <li>- Reducer</li>
        <li>- Hooks Personnalisés</li>
        <li>- ContextAPI</li>
        <li>- UseCallback & UseMemo</li>
        <li>- Mise en Cache</li>
      </ul>
      <h6>Roadmap : </h6>
      <ul>
        <li>- Hook personnalisé si un plat existe : useMealExist</li>
        <li>
          - Hook personnalisé trouvé plat avec gestion erreur : useFindMeal
        </li>
        <li>- Reducer avec case : "Fetching", "Done", "ERROR"</li>
        <li>- DarkMode avec Context API + un Consumer</li>
        <li>- UseCallback & UseMemo</li>
        <li>- Mise en Cache</li>
      </ul>
      <h6>-------------------------------------</h6>
      <div>
        <div>
          <ErrorBoundary key={mealName} FallbackComponent={ErrorDisplay}>
            <InputSearch setMeal={setMealName} />
            <h6>
              Avec un hook personnalisé -------------------------------------
            </h6>
            <FindMeal mealName={mealName} />
            <h6>Avec un reducer -------------------------------------</h6>
            <FindMealReduce mealName={mealName} />

            <h6>Avec un contextAPI -------------------------------------</h6>
            <ThemeProviderContext mealName={mealName} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  )
}

export default ChallengeHooksAvances
