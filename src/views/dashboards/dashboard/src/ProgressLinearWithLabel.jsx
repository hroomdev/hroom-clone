'use client'

// React Imports
//import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

const LinearProgressWithLabel = props => {
  return (
    <div className='flex items-center gap-3'>
      <div className='is-full'>
        <LinearProgress variant='determinate' {...props} />
      </div>
      {/*<Typography variant='body2'>{`${Math.round(props.value)}%`}</Typography>*/}
    </div>
  )
}

const ProgressLinearWithLabel = progressPercent => {
  // States
  //const [progress, setProgress] = useState(10)

  //useEffect(() => {
  //  const timer = setInterval(() => {
  //    setProgress(prevProgress => (prevProgress >= 100 ? 10 : prevProgress + 10))
  //  }, 800)
  //
  //  return () => {
  //    clearInterval(timer)
  //  }
  //}, [])

  return <LinearProgressWithLabel value={progressPercent} />
}

export default ProgressLinearWithLabel
