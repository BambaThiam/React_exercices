import React from 'react'
import './data/TravelListApp/travelList.css'

const Logo = () => {
  return <h1 className="text-5xl p-4">🌴 Far Away APP 👜</h1>
}

const From = () => {
  return (
    <div className="add-form text-3xl p-3">
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  )
}

const PackingList = () => {
  return <div className="list">LIST</div>
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
      <From />
      <PackingList />
      <Stats />
    </div>
  )
}

export default TravelList
