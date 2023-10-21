// import Clipboard from 'clipboard'
import { useState } from 'react'
// import Clipboard from 'clipboard'
import emojiList from './emojiList'
import { useEffect } from 'react'

// Header

const Header = ({ nbFound }) => {
  // 🐶 Fais en sorte que le Header affiche 'Aucun résultat' ou 'X emojis trouvés' en fonction de nbFound
  return (
    <div>
      <h1>Bienvenue sur EmojiApp</h1>
      <div>{nbFound > 0 ? `${nbFound} émojis trouvés` : `Aucun résultat`}</div>
    </div>
  )
}

// SearchInput
// 🐶 Crée une fonction onChange qui appelera la fonction onTextChange passée en props
const SearchInput = ({ onTextChange }) => {
  const onChange = (event) => {
    onTextChange(event.target.value)
  }
  return (
    <div>
      <div>
        <input type="text" onChange={onChange} />
      </div>
    </div>
  )
}

// Result
const Result = ({ data = [] }) => {
  // useEffect(() => {
  //   const clipboard = new Clipboard('.copy-to-clipboard')
  //   return () => {
  //     clipboard.destroy()
  //   }
  // })
  return (
    <div>
      {data.map((emojiData) => (
        <EmojiResultRow
          key={emojiData.title}
          symbol={emojiData.symbol}
          title={emojiData.title}
        />
      ))}
    </div>
  )
}

//EmojiResultRow

const EmojiResultRow = ({ symbol, title }) => {
  return (
    <div className="" data-clipboard-text={symbol}>
      {symbol}
      <span>{title}</span>
      <span>Copier</span>
    </div>
  )
}

//filterEmoji
const filterEmoji = (searchText, maxResults = 10) => {
  return emojiList
    .filter((emoji) => {
      if (emoji.title.toLowerCase().includes(searchText.toLowerCase())) {
        return true
      }
      if (emoji.keywords.includes(searchText)) {
        return true
      }
      if (emoji.symbol.includes(searchText)) {
        return true
      }
      return false
    })
    .slice(0, maxResults)
}

// 🐶 Gère le composant parent
export function EmojiSearch() {
  // 🐶 Créé un state `dataEmoji` qui contiendra un tableau d'émojis
  const [dataEmoji, setDataEmoji] = useState([])
  // 🐶 Créé une fonction 'handleTextChange' qui prend en paramètre 'text' le texte saisie dans le champs Input
  const handleTextChange = (text) => {
    setDataEmoji(filterEmoji(text))
  }

  return (
    <div>
      <Header nbFound={dataEmoji.length} />
      <SearchInput onTextChange={handleTextChange} />
      <Result data={dataEmoji} />
    </div>
  )
}
