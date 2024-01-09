import React from 'react'
import styles from './CityItem.module.css'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

const CityItem = ({ city }) => {
  const { cityName, emoji, date } = city
  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.cityName}>{cityName}</span>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.button}>&times;</button>
    </li>
  )
}

export default CityItem
