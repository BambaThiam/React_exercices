import { useState } from 'react'
import StarComponent from './StarComponent'

const StarRating = () => {
  const [movieRating, setMovieRating] = useState(0)
  return (
    <div>
      <StarComponent />
      <StarComponent size={6} color="red" />
      <StarComponent
        maxRating={10}
        messages={['Terrible', 'Bad', 'Decent', 'Good', 'Great']}
      />
      <StarComponent defaultRating={3} />
      <div>
        <StarComponent
          color="blue"
          maxRating={10}
          onSetRating={setMovieRating}
        />
        <p>This movie wad rated {movieRating} stars</p>
      </div>
    </div>
  )
}

export default StarRating
