import { useEffect, useRef, useState } from 'react'
import '../data/usepopcorn.css'
import StarComponent from '../StarComponent'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar1">
      <Logo />
      {children}
    </nav>
  )
}

const Logo = () => {
  return (
    <div className="logo1">
      <span role="img1">🍿</span>
      <h2>usePopcorn</h2>
    </div>
  )
}

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null)

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return
      if (e.key === 'Enter') {
        inputEl.current.focus()
        setQuery('')
      }
    }

    document.addEventListener('keydown', callback)
    return () => {
      document.addEventListener('keydown', callback)
    }
  }, [setQuery])

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

const Numresults = ({ movies }) => {
  return (
    <p className="num-results">
      {/* Found <strong>{movies.length}</strong> results */}
      Found <strong>{movies?.length}</strong> results
    </p>
  )
}

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

const MovieList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list1 list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}
const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="box1">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>

      {isOpen && children}
    </div>
  )
}

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))
  return (
    <div className="summary">
      <h3>Movies you watched</h3>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

const WatchedMovie = ({ movie, onDeleteWatched }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          <span>❌</span>
        </button>
      </div>
    </li>
  )
}

const WatchedMoviesList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className="list1">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}

const Main = ({ children }) => {
  return <main className="main1">{children}</main>
}

const Loader = () => {
  return (
    <div className="loader">
      <span>Loading...</span>
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  return (
    <div className="error">
      <span>❌{message}</span>
    </div>
  )
}

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const countRef = useRef(0)

  useEffect(() => {
    if (userRating) countRef.current += 1
    console.log(countRef.current)
  }, [userRating])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Genre: genre,
    Director: director,
    Released: released,
  } = movie

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  // Listning to a KeyPress event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseMovie()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCloseMovie])

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true)
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      )
      const data = await response.json()
      // console.log(data)
      setMovie(data)
      setIsLoading(false)
    }

    getMovieDetails()
  }, [selectedId])

  useEffect(() => {
    if (!title) return
    document.title = `Movie | ${title}`

    // clean up function
    return () => {
      document.title = 'Bamba_Usepopcorn'
    }
  }, [title])

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            {/* <h2>Selected movie</h2> */}
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                <span>{imdbRating} IMDb rating</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarComponent
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to watched
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with this movie : {watchedUserRating}{' '}
                  <span>⭐️</span>{' '}
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}

const KEY = 'f775b157'

const UsePopcornCustom_Hook = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  // const [watched, setWatched] = useState([])
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched')
    return storedValue ? JSON.parse(storedValue) : []
  })

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id))
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie])

    // option 1 : In handlefunction
    // localStorage.setItem(
    //   'watched',
    //   // on transforme le tableau watched en chaine de caractère
    //   JSON.stringify([
    //     ...watched, // on copie tout le tableau watched
    //     movie, // on ajoute le nouveau film
    //   ])
    // )
  }

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  useEffect(() => {
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

    handleCloseMovie()
    fetchMovies()
    // clean up function
    return () => {
      controller.abort()
    }
  }, [query])

  return (
    <>
      <div className="appUsePopcorn">
        <Navbar>
          <Search query={query} setQuery={setQuery} />
          <Numresults movies={movies} />
        </Navbar>
        <Main>
          <Box movies={movies}>
            {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {error && <ErrorMessage message={error} />}
          </Box>
          <Box movies={movies}>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </Box>
        </Main>
      </div>
    </>
  )
}

export default UsePopcornCustom_Hook
