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

const marks = [
  {
    value: 0,
    label: '0°'
  },
  {
    value: 20,
    label: '20°'
  },
  {
    value: 37,
    label: '37°'
  },
  {
    value: 100,
    label: '100°'
  }
]

const SliderStep = ({ activeStep, isLastStep, handleNext, handlePrev }) => {
  const initialSelected = 0

  //States sources
  const [selected, setSelected] = useState(initialSelected)

  return (
    <div className='flex flex-col auto gap-16'>
      <Slider
        marks
        min={10}
        max={110}
        step={10}
        defaultValue={80}
        valueLabelDisplay='on'
        getAriaValueText={selected}
        aria-labelledby='label-always-visible-slider'
      />

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

export default SliderStep
