//https://stackoverflow.com/questions/67010983/nextjs-calling-setinterval-with-a-variable-for-time-inside-of-a-react-useeffect
// file: useInterval.js
import React from 'react'

export const useInterval = (callback, delay) => {
  const savedCallback = React.useRef()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)

      return () => clearInterval(id)
    }
  }, [delay])
}
