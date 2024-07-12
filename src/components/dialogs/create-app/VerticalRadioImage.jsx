import * as React from 'react'

import { useState } from 'react'

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

const VerticalRadioImage = ({ activeStep, isLastStep, handleNext, handlePrev }) => {
  const data = [
    {
      value: 'clock',
      isSelected: true,
      img: '/images/cards/5.png'
    },
    {
      value: 'donuts',
      img: '/images/cards/2.png'
    },
    {
      value: 'flowers',
      img: '/images/cards/1.png'
    },
    {
      value: 'houses',
      img: '/images/cards/4.png'
    }
  ]

  const initialSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1].value

  //States sources
  const [selected, setSelected] = useState(initialSelected)

  const handleChange = prop => {
    if (typeof prop === 'string') {
      setSelected(prop)
    } else {
      setSelected(prop.target.value)
    }
  }

  //
  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={4}></Grid>
      <div className='flex flex-row space-between'>
        <p class='ft00'>
          Answer 1
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={0}
              data={data[0]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
        <p class='ft00'>
          Answer 2
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={1}
              data={data[1]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
        <p class='ft00'>
          Answer 3
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={2}
              data={data[2]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
        <p class='ft00'>
          Answer 4
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={3}
              data={data[3]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
      </div>
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

export default VerticalRadioImage
