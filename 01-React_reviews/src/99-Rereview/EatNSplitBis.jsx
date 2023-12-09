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

const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend?.id
  return (
    <li className={isSelected ? 'selected' : ''}>
      {/* <li> */}
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

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  )
}

const FriendsList = ({
  friends,
  friendName,
  friendURL,
  handleSubmit,
  handleFriendName,
  handleFriendURL,
  initialFriends,
  showForm,
  selectedFriend,
  onSelection,
  handleShowAddFriend,
}) => {
  return (
    <>
      <ul className="friend-card">
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            selectedFriend={selectedFriend}
            onSelection={onSelection}
          />
        ))}
      </ul>
      <FormAddFriend
        friendURL={friendURL}
        handleSubmit={handleSubmit}
        setFriendName={handleFriendName}
        handleFriendURL={handleFriendURL}
        showForm={showForm}
        selectedFriend={selectedFriend}
      />
      <Button onClick={() => handleShowAddFriend()}>
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
  selectedFriend,
}) => {
  if (!showForm) return null
  return (
    // {showForm && (
    <form className={`form-add-friend`}>
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

const FormSplitBill = ({ friend, onSplitBill }) => {
  const [bill, setBill] = useState('')
  const [paidByUser, setPaidByUser] = useState('')
  const [whoIsPaying, setWhoIsPaying] = useState('user')

  const paidByFriend = (bill, paidByUser) => {
    if (!bill || !paidByUser) return
    if (bill >= paidByUser) {
      return bill - paidByUser
    }
    return 'Verify expense'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!bill || !paidByUser) return
    onSplitBill(
      whoIsPaying === 'user' ? paidByFriend(bill, paidByUser) : -paidByUser
    )
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split a bill with {friend.name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧍🏾Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}
      />
      <label>🧑🏾‍🤝‍🧑 {friend.name}'s expense</label>
      <input
        type="text"
        disabled
        className="bg-transparent"
        value={paidByFriend(bill, paidByUser)}
        // onChange={paidByFriend}
      />
      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value={friend.name}>{friend.name}</option>
      </select>
      <Button onClick={console.log('test')} type="submit">
        Split bill
      </Button>
    </form>
  )
}

const EatNSplitBis = () => {
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [friends, setFriends] = useState(initialFriends)
  const [showForm, setShowForm] = useState(false)
  const [friendName, setFriendName] = useState('')
  const [friendURL, setFriendURL] = useState('https://i.pravatar.cc/48')

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

  const handleShowAddFriend = () => {
    setShowForm((prev) => !showForm)
  }
  const handleFriendName = (e) => {
    setFriendName(e.target.value)
  }

  const handleFriendURL = (e) => {
    setFriendURL(e.target.value)
  }

  const selectedFriendHandler = (friend) => {
    // setSelectedFriend(friend)
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend))
    setShowForm(null)
  }
  const handleSplitBill = (value) => {
    console.log(value)
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    )
    setSelectedFriend(null)
  }

  return (
    <>
      <div>EatNSplitBis : Partage de dépenses with key props</div>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            friendName={friendName}
            friendURL={friendURL}
            handleSubmit={handleSubmit}
            handleFriendName={handleFriendName}
            handleFriendURL={handleFriendURL}
            initialFriends={initialFriends}
            showForm={showForm}
            handleShowAddFriend={handleShowAddFriend}
            selectedFriend={selectedFriend}
            onSelection={selectedFriendHandler}
            // onSelectedFriend={selectedFriendHandler}
          />
        </div>
        {selectedFriend && (
          <FormSplitBill
            friend={selectedFriend}
            onSplitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        )}
      </div>
    </>
  )
}

export default EatNSplitBis
