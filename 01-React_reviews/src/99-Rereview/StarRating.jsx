import React from 'react'

const StarRating = () => {
  const [movieRating, setMovieRating] = React.useState(0)
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

const StarComponent = ({
  maxRating = 5,
  color = '#fcc419',
  size = 12,
  messages = [],
  defaultRating = 0,
  onSetRating,
}) => {
  const [rating, setRating] = React.useState(defaultRating)
  const [tempRating, setTempRating] = React.useState(0)

  const handleRating = (rating) => {
    setRating(rating)
    onSetRating(rating)
  }

  return (
    <>
      <h6>Hover the stair</h6>
      <div className="flex flex-row justify-center gap-6">
        <div className="flex flex-row gap-1">
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
              onRating={() => handleRating(i + 1)}
              onHoverIn={() => setTempRating(i + 1)}
              onHoverOut={() => setTempRating(0)}
              color={color}
              size={size}
            />
          ))}
        </div>
        <p className={`leading-1 m-0 text-${size / 2}xl`}>
          {messages.length === maxRating
            ? messages[tempRating ? tempRating - 1 : rating - 1]
            : tempRating || rating || ''}
        </p>
      </div>
    </>
  )
}

const Star = ({ onRating, full, onHoverIn, onHoverOut, color, size }) => {
  return (
    <span
      className={`w-${size} h-${size} block cursor-pointer`}
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  )
}