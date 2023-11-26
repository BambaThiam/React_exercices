import { useState } from 'react'

import Logo from './data/TravelListApp/Components_Travel_List3/Logo'
import Form from './data/TravelListApp/Components_Travel_List3/Form'
import PackingList from './data/TravelListApp/Components_Travel_List3/PackingList'
import Stats from './data/TravelListApp/Components_Travel_List3/Stats'

import './data/TravelListApp/travelList.css'

const TravelListTer = () => {
  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    )
  }

  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    )

    if (confirmed) setItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}

export default TravelListTer
