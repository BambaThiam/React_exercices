import React from 'react'
import { pizzaData } from './data/PizzaDataMenu/data'
import './data/PizzaDataMenu/index.css'

const Header = () => {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };

  return (
    <header className="header">
      <h2>Fast React Pizza Co.</h2>
    </header>
  )
}

const Menu = () => {
  return (
    <>
      <main className="menu">
        <h2>Our menu</h2>
        <p>
          Authentic Italian cuisine. 6 creative dishes to choose from. All from
          our stone oven, all organic, all delicious.
        </p>
        <ul className="pizzas">
          <li className={`pizza ${pizzaData.soldOut ? 'sold-out' : ''}`}>
            {pizzaData.map((pizza) => (
              <div key={pizza.name}>
                <img src={pizza.photoName} alt={pizza.name} />
                <h2>{pizza.name}</h2>
                <p>{pizza.ingredients}</p>
                <p>{pizza.price}</p>
              </div>
            ))}
          </li>
        </ul>
      </main>
    </>
  )
}

const Footer = () => {
  const hour = 15
  // const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)
  // return (
  //   <footer className="footer">
  //     {isOpen ? (
  //       <h1>Open</h1>
  //     ) : (
  //       <p>
  //         We're open from {openHour}:00 to {closeHour}:00. Come visit us or
  //         order online.
  //       </p>
  //     )}
  //   </footer>
  // )
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
    </footer>
  )
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  )
}

const PizzaMenu = () => {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

export default PizzaMenu
