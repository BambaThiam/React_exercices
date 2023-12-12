import React, { useEffect, useState } from 'react'

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState('EUR')
  const [to, setTo] = useState('USD')
  const [result, setResult] = useState(3)
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    setIsLoading(true)
    const getCurrencyRate = async () => {
      const response = await fetch(URL)
      const data = await response.json()

      if (from === to) {
        setResult(amount)
      } else {
        setResult(`${amount} ${from} = ${data.rates[to]} ${to}`)
      }
    }
    setIsLoading(false)

    getCurrencyRate()
  }, [amount, from, to, URL])

  return (
    <>
      <div>Currency Converter</div>
      <div className="flex flex-row gap-2 justify-center">
        <input
          type="text"
          value={amount}
          onChange={handleChangeAmount}
          disabled={isLoading}
        />

        <select onChange={handleChangeFrom} value={from} disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <select onChange={handleChangeTo} value={to} disabled={isLoading}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p className="ml-10">{result}</p>
      </div>
    </>
  )
}

export default CurrencyConverter
