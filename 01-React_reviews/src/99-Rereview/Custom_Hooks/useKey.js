import { useEffect } from 'react'

export function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action()
      }
    }
    document.addEventListener('keydown', callback)
    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [key, action])

  //   useEffect(() => {
  //     const handleKeyDown = (e) => {
  //       if (e.key === 'Escape') {
  //         onCloseMovie()
  //       }
  //     }

  //     document.addEventListener('keydown', handleKeyDown)

  //     return () => {
  //       document.removeEventListener('keydown', handleKeyDown)
  //     }
  //   }, [onCloseMovie])
}
