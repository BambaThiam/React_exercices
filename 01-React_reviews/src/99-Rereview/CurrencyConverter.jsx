import React from 'react'

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

const CurrencyConverter = () => {
  const [amount, setAmount] = React.useState(0)
  const [from, setFrom] = React.useState('USD')
  const [to, setTo] = React.useState('EUR')
  const [result, setResult] = React.useState(0)

  const handleChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }

  const handleChangeFrom = (event) => {
    setFrom(event.target.value)
  }

  const handleChangeTo = (event) => {
    setTo(event.target.value)
  }

  const URL = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`

  return (
    <>
      <div>Currency Converter</div>
      <div className="flex flex-row gap-2 justify-center">
        <input type="text" onChange={handleChangeAmount} />
        <select onChange={handleChangeFrom} value={from}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <select onChange={handleChangeTo} value={to}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p className="ml-10">OUTPUT</p>
      </div>
    </>
  )
}

export default CurrencyConverter
