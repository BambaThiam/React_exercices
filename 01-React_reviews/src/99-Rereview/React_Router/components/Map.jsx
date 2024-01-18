import { useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return <div className={styles.mapContainer}>
    <h3>Map</h3>
    <div>lat: {lat}, lng: {lng}</div>
    <button className="button" onClick={() => setSearchParams({ lat: 0, lng: 0 })}>Change position</button>
  </div>
}

export default Map
