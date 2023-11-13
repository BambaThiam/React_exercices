import { createContext, useContext, useState } from 'react'
import { useFindMeal } from './Reducer'
import { InputSearch } from './ChallengeHook'

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

export const ThemeContext = createContext(themes.light)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit etre dans ThemeProvider')
  }
  return context
}

function CheckBox({ darkMode, onChange }) {
  const theme = useContext(ThemeContext)

  const handleCheck = (e) => {
    onChange(e.target.checked)
  }
  return (
    <label style={{ background: theme.background, color: theme.foreground }}>
      <input type="checkbox" checked={darkMode} onChange={handleCheck} />{' '}
      utiliser le DarkMode ?
    </label>
  )
}

const FindMealContext = ({ mealName }) => {
  const theme = useContext(ThemeContext)
  const { meal, error } = useFindMeal(mealName)
  if (error) {
    throw error
  }
  return (
    <div style={{ background: theme.background, color: theme.foreground }}>
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
export const ThemeProviderContext = () => {
  const [mealName, setMealName] = useState('')
  // const theme = useContext(ThemeContext)
  const [darkMode, setDarkMode] = useState(false)
  const theme = darkMode ? themes.dark : themes.light
  return (
    <ThemeContext.Provider value={theme}>
      <InputSearch setMeal={setMealName} />
      <CheckBox darkMode={darkMode} onChange={setDarkMode} />
      {/* <FindMealContext mealName={props} /> */}
      <FindMealContext mealName={mealName} />
    </ThemeContext.Provider>
  )
}
