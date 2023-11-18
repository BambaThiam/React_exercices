import React, { useState } from 'react'
import './data/TravelListApp/travelList.css'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
]

const Logo = () => {
  return <h1 className="text-5xl p-4">🌴 Far Away APP 👜</h1>
}

const Form = ({ onAddItems }) => {
  const [desription, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!desription) {
      return
    }

    const newItem = {
      // id: initialItems.length + 1,
      id: Date.now(),
      description: desription,
      quantity: quantity,
      packed: false,
    }

    onAddItems(newItem)

    setDescription('')
    setQuantity(1)

    return
  }
  return (
    <form className="add-form text-3xl p-3" onSubmit={handleSubmit}>
      <h3 className="text-transform: capitalize">
        What do you need for your 😍 trip?
      </h3>
      <select
        className="px-4"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        id="item"
        className="px-4"
        value={desription}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button id="item" className="px-4">
        Add
      </button>
    </form>
  )
}

// Pour le rendu des élements
const PackingList = ({ items, onDeleteItem, onPackedItem }) => {
  return (
    <div className="list">
      <div>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              value={item.packed}
              onClick={() => onPackedItem(item.id)}
            />
            <span style={{ textDecoration: item.packed ? 'line-through' : '' }}>
              {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </div>
    </div>
  )
}

// Pour le rendu du footer
const StatistiqueFooter = ({ items }) => {
  const numItems = items.length
  const numPacked = items.filter((item) => item.packed).length
  const percentPacked = Math.round((numPacked / numItems) * 100)
  return (
    <footer className="stats text-3xl p-3">
      <em>
        🧳 You have {numItems} items on your list, and you already packed{' '}
        {numPacked} ({percentPacked}%)
      </em>
    </footer>
  )
}

const TravelListBis = () => {
  // Pour le lifting state de items pour Form et PackingList
  const [items, setItems] = useState(initialItems)

  const handleAddItems = (item) => {
    setItems((items) => [...items, item])
    console.log(item)
  }

  const handlePackedItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  const handleDelete = (id) => {
    setItems((items) => items.filter((item) => item.id !== id))
  }
  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDelete}
        onPackedItem={handlePackedItem}
      />
      <StatistiqueFooter items={items} />
    </div>
  )
}

export default TravelListBis
