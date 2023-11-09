/* eslint-disable no-unused-vars */
/* NE PAS MODIFIER CE FICHIER  */
import * as React from 'react'

const marvelApiKey = '6bcc5c7ff0ad488fb58f759c4069964c'

const myHeader = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
})
const init = {
  method: 'GET',
  headers: myHeader,
  mode: 'cors',
}

const fetchMarvel = (name) => {
  const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${marvelApiKey}&nameStartsWith=${name}`
  return fetch(url, init)
    .then((response) => response.json())
    .then((json) => {
      if (json.data.results.length > 0) {
        return json.data.results[0]
      } else {
        return Promise.reject(
          new Error(`Aucun Marvel trouvé avec le nom "${name}"`)
        )
      }
    })
    .catch((error) => {
      return Promise.reject(
        new Error(`Aucun Marvel trouvé avec le nom "${name}"`)
      )
    }) // ERROR DU JSON()
    .catch((error) => {
      return Promise.reject(
        new Error(`Aucun Marvel trouvé avec le nom "${name}"`)
      )
    }) // ERROR APPEL API
}

function MarvelPersoView({ marvel }) {
  return (
    <div>
      <div className="marvel-img">
        <img
          height="400"
          src={marvel.thumbnail.path + '.' + marvel.thumbnail.extension}
          alt={marvel.name}
        />
      </div>
      <div className="marvel-name">
        <h1>
          {marvel.name}
          <sup>{marvel.number}</sup>
        </h1>
      </div>
      <div className="marvel-wrapper">
        <h3>Apparait dans</h3>
        <ul>
          {marvel.series.items.map((serie, idx) => (
            <li key={idx}>
              <label>{serie.name}</label>:{' '}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function MarvelSearchForm({ onSearch, marvelName }) {
  const [name, setName] = React.useState(marvelName)
  return (
    <div className="component-header">
      <div>
        Recherche Marvel (<span onClick={(e) => setName('x-men')}>x-men</span>,{' '}
        <span onClick={(e) => setName('spider-man')}>spider-man</span> ...)
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-sky-300 m-2 p-1"
        />
        <input
          type="button"
          onClick={() => onSearch(name)}
          value={'rechercher'}
          className="border-2 border-sky-300 m-2 p-1"
        />
      </div>
    </div>
  )
}

export { MarvelPersoView, MarvelSearchForm, fetchMarvel }
// export { MarvelSearchForm, fetchMarvel }
