import * as React from 'react'

import { useState, useEffect } from 'react'

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

import { getQuestData as dbData } from '@/app/server/actions'

const StarRate = ({ activeStep, isLastStep, handleNext, handlePrev, setTitle }) => {
  const initialData = [{}]

  const [active, setActive] = useState(-1)
  const [data, setData] = useState(initialData)

  const handleClick = active => {
    console.log('handle click active' + active)
    setActive(active)
  }

  useEffect(() => {
    async function fetch() {
      await dbData().then(dbData => {
        var answers = dbData.quiz1questions[activeStep].answers
        var title = dbData.quiz1questions[activeStep].subtitle

        setTitle(title)

        function readData() {
          for (let i = 0; i < answers.length; i++) {
            var dataElement = {}

            data[i] = dataElement
          }
        }

        readData()
        setData(data)

        setActive(active)
      })
    }

    fetch()

    return () => {}
  }, [data, active])

  if (data.length < 2) {
    return 'Loading...'
  }

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={4}>
        {data.map((item, index) => {
          return (
            <Button
              key={index}
              className={active < index ? 'active' : undefined}
              id={{ index }}
              onClick={a => handleClick(index)}
              variant={active < index ? 'light' : 'outlined'}
              color='secondary'
            >
              <img
                src={active < index ? '/images/icons/yel_star_outline.png' : '/images/icons/yel_star.jpg'}
                alt='firebase'
                height={30}
                width={30}
              ></img>
            </Button>
          )
        })}
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
