import React, { createContext, useContext, useState } from 'react'
import UseContextCache from './UseContextCache'

const themes = {
  light: {
    ul: { listStyleType: 'square' },
    li: { background: '#eeeeee', color: '#000000' },
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    ul: { listStyleImage: "url('https://www.w3schools.com/css/sqpurple.gif')" },
    li: { background: '#222222', color: 'white' },
    foreground: '#ffffff',
    background: '#222222',
  },
}

// 🐶 créé un context vers l'objet 'themes' avec l'API context (utilise le thème light par défaut)
// 🤖 const ThemeContext = React.createContext(themes.light)

const ThemeContext = createContext(themes.light)

// 🐶 Toolbar permet de propager theme aux enfants : ici on en a plus besoin
function Toolbar() {
  // ⛏️ supprime toutes les références à 'theme'
  return (
    <div>
      <Button />
      <List />
    </div>
  )
}

function Button() {
  // 🐶 utilise le hook useContext pour accéder à theme

  const theme = useContext(ThemeContext)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Envoyer
    </button>
  )
}

// 🐶 Passe par 'useContext'
function List() {
  const theme = useContext(ThemeContext)
  const items = ['react', 'angular', 'vue']
  return (
    <ul style={{ ...theme.ul }}>
      {items.map((item, index) => {
        return (
          <Item key={index} theme={theme}>
            {item}
          </Item>
        )
      })}
    </ul>
  )
}
// 🐶 Passe par 'useContext'
function Item({ children }) {
  const theme = useContext(ThemeContext)
  return <li style={{ ...theme.li }}>{children}</li>
}
// 🐶 Passe par 'useContext'
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

// Theme modifiable -----------

const ThemeContext1 = createContext()
const ThemeProvider = (props) => {
  const [theme, setTheme] = React.useState(themes.light)
  const value = [theme, setTheme]
  return <ThemeContext1.Provider value={value} {...props} />
}

function CheckBox1() {
  const [darkMode, setDarkMode] = useState(false)
  const [theme, setTheme] = useContext(ThemeContext1)
  const handleCheck = (e) => {
    setDarkMode(e.target.checked)
    setTheme(e.target.checked ? themes.dark : themes.light)
  }
  return (
    <label style={{ background: theme.background, color: theme.foreground }}>
      <input type="checkbox" checked={darkMode} onChange={handleCheck} />{' '}
      utiliser le DarkMode ?
    </label>
  )
}

function Toolbar1() {
  // ⛏️ supprime toutes les références à 'theme'
  return (
    <div>
      <Button1 />
      <List1 />
    </div>
  )
}

function Button1() {
  const [theme] = React.useContext(ThemeContext1)
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Envoyer
    </button>
  )
}

function List1() {
  const [theme] = React.useContext(ThemeContext1)
  const items = ['react', 'angular', 'vue']
  return (
    <ul style={{ ...theme.ul }}>
      {items.map((item, index) => {
        return (
          <Item1 key={index} theme={theme}>
            {item}
          </Item1>
        )
      })}
    </ul>
  )
}

function Item1({ children }) {
  const [theme] = useContext(ThemeContext1)
  return <li style={{ ...theme.li }}>{children}</li>
}

// Hook consommateur -----------

const ThemeContext2 = createContext()
const ThemeProvider1 = (props) => {
  const [theme, setTheme] = React.useState(themes.light)
  const value = [theme, setTheme]
  return <ThemeContext2.Provider value={value} {...props} />
}

const useTheme = () => {
  const context = useContext(ThemeContext2)
  if (!context) {
    throw new Error('useTheme doit etre dans ThemeProvider')
  }
  return context
}

function CheckBox2() {
  const [darkMode, setDarkMode] = useState(false)
  const [theme, setTheme] = useTheme()
  const handleCheck = (e) => {
    setDarkMode(e.target.checked)
    setTheme(e.target.checked ? themes.dark : themes.light)
  }
  return (
    <label style={{ background: theme.background, color: theme.foreground }}>
      <input type="checkbox" checked={darkMode} onChange={handleCheck} />{' '}
      utiliser le DarkMode ?
    </label>
  )
}

function Toolbar2() {
  // ⛏️ supprime toutes les références à 'theme'
  return (
    <div>
      <Button2 />
      <List2 />
    </div>
  )
}

function Button2() {
  const [theme] = useTheme()
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Envoyer
    </button>
  )
}

function List2() {
  const [theme] = useTheme()
  const items = ['react', 'angular', 'vue']
  return (
    <ul style={{ ...theme.ul }}>
      {items.map((item, index) => {
        return (
          <Item2 key={index} theme={theme}>
            {item}
          </Item2>
        )
      })}
    </ul>
  )
}

function Item2({ children }) {
  const [theme] = useTheme()
  return <li style={{ ...theme.li }}>{children}</li>
}

// Resultat------
const UseContext = () => {
  const [darkMode, setDarkMode] = React.useState(false)
  const theme = darkMode ? themes.dark : themes.light
  return (
    <div>
      <h6>
        1- Dans cet exercice tu vas devoir utiliser l'API `context` et
        `useContext` pour gérer le thème.
      </h6>
      <h6>------------------UseContext-------------------</h6>
      <div>
        <ThemeContext.Provider value={theme}>
          <CheckBox darkMode={darkMode} onChange={setDarkMode} />
          <Toolbar />
        </ThemeContext.Provider>
      </div>
      <h6>
        2- Nous voulons maintenant que le changement de thème soit géré dans un
        composant `ThemeProvider` et accessible depuis les enfants (par exemple
        dans le composant `CheckBox` etc ...).
      </h6>
      <h6>------------------Thème modifiable-------------------</h6>
      <div>
        <ThemeProvider>
          <CheckBox1 />
          <Toolbar1 />
        </ThemeProvider>
      </div>
      <h6>
        3- Dans cet exercice nous allons créer un _consumer hook_ `useTheme`. Ce
        hook s'assurera que son utilisation est bien faite à l'intérieur d'un
        provider.
      </h6>
      <h6>------------------Hook consommateur-------------------</h6>
      <div>
        <ThemeProvider1>
          <CheckBox2 />
          <Toolbar2 />
        </ThemeProvider1>
      </div>
      <h6>------------------Mettre en cache-------------------</h6>
      <div>
        <UseContextCache />
      </div>
    </div>
  )
}

export default UseContext
