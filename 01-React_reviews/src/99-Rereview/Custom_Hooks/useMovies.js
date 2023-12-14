import { useEffect, useState } from 'react'

const KEY = 'f775b157'
export const useMovies = (query) => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // callback?.()

    const controller = new AbortController()

    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )
        if (!response.ok) {
          throw new Error('Something went wrong with fetching movies')
        }
        const data = await response.json()
        if (data.Response === 'False') {
          throw new Error(data.Error)
        }

        setMovies(data.Search)
        setError('')
      } catch (err) {
        // Pour ignorer l'erreur AbortError qui n'en n'est pas une
        if (err.name === 'AbortError') {
          // console.error(err.message)
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    // if (!query.length) {
    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    // handleCloseMovie()
    fetchMovies()
    // clean up function
    return () => {
      controller.abort()
    }
  }, [query])

  return {
    movies,
    isLoading,
    error,
  }
}
