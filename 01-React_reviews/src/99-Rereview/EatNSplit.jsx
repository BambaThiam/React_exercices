import React, { useState } from 'react'
import './data/eatnsplit.css'

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
]

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  )
}

const Friend = ({ friend }) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {-1 * friend.balance}$
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}

      <Button onClick={() => console.log('test')}>Select</Button>
    </li>
  )
}

const FriendsList = ({ initialFriends, isBillOpen }) => {
  const [friends, setFriends] = useState(initialFriends)
  const [friendName, setFriendName] = useState('')
  const [friendURL, setFriendURL] = useState('https://i.pravatar.cc/48')
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!friendName || !friendURL) return
    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name: friendName,
      image: `${friendURL}?=${id}`,
      balance: 0,
    }
    setFriends((prevFriends) => [...prevFriends, newFriend])
    setFriendName('')
    setFriendURL('https://i.pravatar.cc/48')
  }

  const handleFriendName = (e) => {
    setFriendName(e.target.value)
  }

  const handleFriendURL = (e) => {
    setFriendURL(e.target.value)
  }

  return (
    <>
      <ul className="friend-card">
        {friends.map((friend) => (
          <Friend key={friend.id} friend={friend} isBillOpen={isBillOpen} />
        ))}
      </ul>
      <FormAddFriend
        friendURL={friendURL}
        handleSubmit={handleSubmit}
        setFriendName={handleFriendName}
        handleFriendURL={handleFriendURL}
        showForm={showForm}
      />
      <Button onClick={() => setShowForm((prev) => !showForm)}>
        {!showForm ? 'Add Friend' : 'Close'}
      </Button>
    </>
  )
}

const FormAddFriend = ({
  friendURL,
  handleSubmit,
  setFriendName,
  showForm,
  handleFriendURL,
}) => {
  if (!showForm) return null
  return (
    // {showForm && (
    <form className="form-add-friend">
      <label>🧑🏾‍🤝‍🧑 Friend Name</label>
      <input type="text" onChange={setFriendName} />
      <label>🖼️ Image URL</label>
      <input type="text" onChange={handleFriendURL} value={friendURL} />
      <Button onClick={handleSubmit} type="submit">
        Add
      </Button>
    </form>
    // )}
  )
}

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>split a bill with {'X'}</h2>
      <label>💰 Bill value</label>
      <input type="text" />
      <label>🧍🏾Your expense</label>
      <input type="text" />
      <label>🧑🏾‍🤝‍🧑 {'X'}'s expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="you">You</option>
        <option value="them">{'X'}</option>
      </select>
      <Button onClick={console.log('test')} type="submit">
        Split bill
      </Button>
    </form>
  )
}

const EatNSplit = () => {
  const [isBillOpen, setIsBillOpen] = useState(true)
  return (
    <>
      <div>EatNSplit : Partage de dépenses</div>
      <div className="app">
        <div className="sidebar">
          <FriendsList initialFriends={initialFriends} />
        </div>
        {isBillOpen && <FormSplitBill />}
      </div>
    </>
  )
}

export default EatNSplit
