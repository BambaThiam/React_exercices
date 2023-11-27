import React from 'react'

const BillInput = ({ amount, handleChange }) => {
  return (
    <div>
      <label htmlFor="">How much was the bill</label>
      <input
        type="number"
        value={amount}
        onChange={handleChange}
        className="mx-4 px-4 py-2 rounded-lg"
      />
    </div>
  )
}

const SelectPercentagePerso = ({ percentagePerso, handlePercentagePerso }) => {
  return (
    <div>
      <label htmlFor="">How did you like the service?</label>
      <select
        value={percentagePerso}
        onChange={handlePercentagePerso}
        className="mx-4 px-4 py-2 rounded-lg"
      >
        <option value="0">Dessatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It wa good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

const SelectPercentageFriend = ({
  percentageFriend,
  handlePercentageFriend,
}) => {
  return (
    <div>
      <label htmlFor="">How did you friendlike the service?</label>
      <select
        value={percentageFriend}
        onChange={handlePercentageFriend}
        className="mx-4 px-4 py-2 rounded-lg"
      >
        <option value="0">Dessatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It wa good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}

const Output = () => {
  const [amount, setAmount] = React.useState(0)
  const [percentagePerso, setPercentagePerso] = React.useState(0)
  const [percentageFriend, setPercentageFriend] = React.useState(0)
  const tip = amount * ((percentageFriend / 100 + percentagePerso / 100) / 2)
  const handleChangeAmount = (event) => {
    setAmount(Number(event.target.value))
  }
  const handleChangePercentagePerso = (event) => {
    setPercentagePerso(Number(event.target.value))
  }

  const handleChangePercentageFriend = (event) => {
    setPercentageFriend(Number(event.target.value))
  }
  return (
    <div className="flex flex-col gap-4">
      <BillInput amount={amount} handleChange={handleChangeAmount} />
      <SelectPercentagePerso
        percentagePerso={percentagePerso}
        handlePercentagePerso={handleChangePercentagePerso}
      />
      <SelectPercentageFriend
        percentageFriend={percentageFriend}
        handlePercentageFriend={handleChangePercentageFriend}
      />
      <div>
        <h2 className="text-5xl font-bold">
          {`You pay : $${amount + tip} ($${amount} + ${tip} tip)`}
        </h2>
      </div>
    </div>
  )
}

const Reset = () => {}

const Calculator = () => {
  return (
    <>
      <div>Calculator</div>
      <div>
        <Output />
        <Reset />
      </div>
    </>
  )
}

export default Calculator
