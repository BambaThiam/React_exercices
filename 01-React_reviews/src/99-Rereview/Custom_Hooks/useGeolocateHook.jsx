import React, { useState } from 'react'

const useGeolocate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState({})
  const [error, setError] = useState(null)

  const { lat, lng } = position

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation')

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      }
    )
  }

  return { lat, lng, error, isLoading, getPosition }
}

const useGeolocateHook = () => {
  const [countClicks, setCountClicks] = useState(0)
  const { lat, lng, error, isLoading, getPosition } = useGeolocate()

  const handleClick = () => {
    setCountClicks(countClicks + 1)
    getPosition()
  }
  return (
    <div>
      <div>***</div>
      <div>
        <button className="button" onClick={handleClick} disabled={isLoading}>
          Get my position
        </button>
        {isLoading && <p>Loading position...</p>}
        {error && <p>{error}</p>}
        {!isLoading && !error && lat && lng && (
          <p>
            Your GPS position:{' '}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
            >
              {lat}, {lng}
              <div className="bg-green-300">Click to see on OpenStreetMap</div>
            </a>
          </p>
        )}

        <p>You requested position {countClicks} times</p>
      </div>
    </div>
  )
}

export default useGeolocateHook
