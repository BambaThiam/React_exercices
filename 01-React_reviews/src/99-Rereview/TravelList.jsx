import React, { useState } from 'react'
import './data/TravelListApp/travelList.css'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
]

const Logo = () => {
  return <h1 className="text-5xl p-4">🌴 Far Away APP 👜</h1>
}

const Form = () => {
  const [desription, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [items, setItems] = useState(initialItems)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!desription) {
      return
    }

    const newItem = {
      id: initialItems.length + 1,
      description: desription,
      quantity: quantity,
      packed: false,
    }
    setItems([...initialItems, newItem])
    console.log(newItem)
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

const PackingList = () => {
  return (
    <div className="list">
      <div>
        {initialItems.map((item) => (
          <li key={item.id}>
            <input type="checkbox" />
            <span style={{ textDecoration: item.packed ? 'line-through' : '' }}>
              {item.quantity} {item.description}
            </span>
            <button>❌</button>
          </li>
        ))}
      </div>
    </div>
  )
}

const Stats = () => {
  return (
    <footer className="stats text-3xl p-3">
      <em>🧳 You have X items on your list, and you already packed X (Y%)</em>
    </footer>
  )
}

const TravelList = () => {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

export default TravelList
