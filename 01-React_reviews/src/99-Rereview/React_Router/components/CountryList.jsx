import Message from './Message'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) {
    return <Spinner />
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )
  }

  // Initialize an empty array to accumulate unique countries with their respective emojis
  const countries = cities.reduce((countries, city) => {
    // Check if the current country of the city is not already included in the accumulator array
    if (!countries.map((el) => el.country).includes(city.country))
      // If it's a new country, add it to the accumulator array along with its emoji
      return [...countries, { country: city.country, emoji: city.emoji }]
    // If the country is already present, just return the current state of the accumulator array
    else return countries
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  )
}

export default CountryList
