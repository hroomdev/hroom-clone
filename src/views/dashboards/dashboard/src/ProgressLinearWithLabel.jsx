'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

//
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

const ProgressLinearWithLabel = props => {
  // States
  const [progress, setProgress] = useState(props.value)

  useEffect(() => {
    setProgress(props.value)
  }, [props.value])

  return <LinearProgressWithLabel value={progress} color={'secondary'} />
}

export default ProgressLinearWithLabel
