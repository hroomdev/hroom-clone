import * as React from 'react'

import { useState } from 'react'

import Slider from '@mui/material/Slider'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'

// MUI Imports
import Button from '@mui/material/Button'

//import Grid from '@mui/material/Grid'

// Components Imports
import CustomInputImg from '@core/components/custom-inputs/Image'

import DirectionalIcon from '@components/DirectionalIcon'

// Components Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'

const StarRate = ({ activeStep, isLastStep, handleNext, handlePrev }) => {
  const [active, setActive] = useState(-1)

  const handleClick = active => {
    setActive(active)
  }

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={4}>
        <div className='flex flex-row space-between'>
          <Button
            key={1}
            className={active <= 0 ? 'active' : undefined}
            id={'1'}
            onClick={a => handleClick(1)}
            variant={active <= 0 ? 'light' : 'outlined'}
            color='secondary'
          >
            <img
              src={active <= 0 ? '/images/icons/yel_star_outline.png' : '/images/icons/yel_star.jpg'}
              alt='firebase'
              height={30}
              width={30}
            ></img>
          </Button>
          <Button
            color='secondary'
            variant={active <= 1 ? 'light' : 'outlined'}
            key={2}
            className={active <= 1 ? 'active' : undefined}
            id={'2'}
            onClick={a => handleClick(2)}
          >
            <img
              src={active <= 1 ? '/images/icons/yel_star_outline.png' : '/images/icons/yel_star.jpg'}
              alt='firebase'
              height={30}
              width={30}
            ></img>
          </Button>
          <Button
            color='secondary'
            variant={active <= 2 ? 'light' : 'outlined'}
            key={3}
            className={active <= 2 ? 'active' : undefined}
            id={'3'}
            onClick={a => handleClick(3)}
          >
            <img
              src={active <= 2 ? '/images/icons/yel_star_outline.png' : '/images/icons/yel_star.jpg'}
              alt='firebase'
              height={30}
              width={30}
            ></img>
          </Button>
          <Button
            color='secondary'
            variant={active <= 3 ? 'light' : 'outlined'}
            key={4}
            className={active <= 3 ? 'active' : undefined}
            id={'4'}
            onClick={a => handleClick(4)}
          >
            <img
              src={active <= 3 ? '/images/icons/yel_star_outline.png' : '/images/icons/yel_star.jpg'}
              alt='firebase'
              height={30}
              width={30}
            ></img>
          </Button>
        </div>
      </Grid>

      <div className='flex items-center justify-between'>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeStep === 0}
          onClick={handlePrev}
          startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={isLastStep ? 'success' : 'primary'}
          onClick={handleNext}
          endIcon={
            isLastStep ? (
              <i className='ri-check-line' />
            ) : (
              <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
            )
          }
        >
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default StarRate
