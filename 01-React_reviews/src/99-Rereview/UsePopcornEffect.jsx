import { useEffect, useState } from 'react'
import './data/usepopcorn.css'
import StarComponent from './StarComponent'

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
]

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
]

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

// const Navbar = ({ movies }) => {
//   return (
//     <nav className="nav-bar1">
//       <Logo />
//       <Search />
//       <Numresults movies={movies} />
//     </nav>
//   )
// }

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
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

const WatchedMovie = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
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
      </div>
    </li>
  )
}

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list1">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
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

const MovieDetails = ({ selectedId, onCloseMovie }) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
              <StarComponent maxRating={10} size={24} />
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

const UsePopcornEffect = () => {
  const [query, setQuery] = useState('Inception')
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  // useEffect(() => {
  //   console.log('After first render')
  // }, [])

  // useEffect(() => {
  //   console.log('After every render')
  // })

  // console.log('During render')

  // useEffect(() => {
  //   console.log('Bamba')
  // }, [query])

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (selectedId === id ? null : id))
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        )
        if (!response.ok) {
          throw new Error('Something went wrong with fetching movies')
        }
        const data = await response.json()
        if (data.Response === 'False') {
          throw new Error(data.Error)
        }

        setMovies(data.Search)
      } catch (err) {
        // console.error(err.message)
        setError(err.message)
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

    fetchMovies()
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
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} />
              </>
            )}
          </Box>
        </Main>
      </div>
    </>
  )
}

export default UsePopcornEffect
