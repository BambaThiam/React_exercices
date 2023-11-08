import React, { useEffect, useState } from 'react'

const ArticlesList = ({ query = 'redux' }) => {
  const [data, setData] = useState([])

  useEffect(
    () => {
      // ⛏️ décommmente ces 3 lignes pour l'appel à HTTP
      fetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
        .then((response) => response.json())
        .then((json) => setData(json.hits))
    },

    //n'oublie pas la dépendance vers 'query' pour n'appeler l'api
    // que sur la modification du prop 'query'
    [query]
  )
  return (
    <ul className="m-4 p-4 border-2">
      {data.map((article) => (
        <li key={article.objectID}>
          <a href={article.url}>{article.title}</a>
        </li>
      ))}
    </ul>
  )
}

const UseEffetHTTP1 = () => {
  const [searchText, setSearchText] = useState('')
  return (
    <div>
      <h6>
        Dans cet exercice nous allons utiliser une API Rest qui nous permet
        d'avoir une liste d'article en fonction d'un mot clef passé en `Query
        Parameters.`
      </h6>
      <h6>
        Hugo le chef de projet te demande de faire un formulaire simple avec un
        champs de recherche. a chaque fois que l'on modifie ce champ, un appel
        vers le service `algolia` est fait pour afficher une liste d'articles
        avec un lien vers cet article.
      </h6>
      <label>Rechercher</label>
      <input
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="border-2 border-sky-300"
      />
      <ArticlesList query={searchText} />
    </div>
  )
}

export default UseEffetHTTP1
