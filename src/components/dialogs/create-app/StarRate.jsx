import * as React from 'react'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import Slider from '@mui/material/Slider'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
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

var onClickNext = (f1, f2) => {
  f1()
  f2()
}

var onClickPrev = (f1, f2) => {
  f1()
  f2()
}

const StarRate = ({ quizGroupTypeId, activeStep, isLastStep, handleNext, handlePrev, setTitle, selectedOptions }) => {
  console.log(activeStep + ' activeStep ' + 'isLastStep ' + isLastStep)

  const router = useRouter()
  const initialData = [{}]

  const [active, setActive] = useState(-1)
  const [data, setData] = useState(initialData)

  //const [selected, setSelected] = useState(initialSelected)
  const [isLoading, setLoading] = useState(true)

  const handleClick = active => {
    setActive(active)

    selectedOptions[activeStep] = active
  }

  useEffect(() => {
    async function fetch() {
      await dbData(quizGroupTypeId).then(dbData => {
        var answers = dbData[activeStep].answers
        var title = dbData[activeStep].subtitle

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

        //router.refresh()
        setLoading(false)
        console.log('after set active ')
      })
    }

    fetch()

    console.log('after fetch ')

    return unmount
  }, [])

  function unmount() {
    // States
    //setSelected(initialSelected)
    setData(initialData)
    setLoading(true)
  }

  if (data.length < 1 || isLoading) {
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
          onClick={onClickPrev.bind(this, unmount, handlePrev)}
          startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={isLastStep ? 'success' : 'primary'}
          onClick={onClickNext.bind(this, unmount, handleNext)}
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
