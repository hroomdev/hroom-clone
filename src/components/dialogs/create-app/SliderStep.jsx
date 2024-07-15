import * as React from 'react'

import { useState, useEffect } from 'react'

import MuiSlider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

// MUI Imports
import Button from '@mui/material/Button'

import DirectionalIcon from '@components/DirectionalIcon'
import { getQuestData as dbData } from '@/app/server/actions'

let initialMarks = [
  {
    value: 0,
    label: 'Not at all'
  },
  {
    value: 100,
    label: 'Very much so'
  }
]

const SliderStepNew = ({ activeStep, isLastStep, handleNext, handlePrev, setTitle }) => {
  const initialSelected = 0

  const [marks, setMarks] = useState(initialMarks)

  //States sources
  const [selected, setSelected] = useState(initialSelected)

  const valuetext = value => {
    return `${value}`
  }

  useEffect(() => {
    async function fetch() {
      await dbData().then(dbData => {
        var questionsubtitle = dbData.quiz1questions[activeStep].subtitle

        console.log('subtitle step ' + questionsubtitle)

        var answers = dbData.quiz1questions[activeStep].answers

        setTitle(questionsubtitle)

        function readMarks() {
          for (let i = 0; i < answers.length; i++) {
            var num = i * 100
            var markElement = {
              value: num,
              label: answers[i]
            }

            marks[i] = markElement
          }
        }

        readMarks()
        setMarks(marks)
      })
    }

    fetch()

    return () => {
      setTitle('blank')
    }
  }, [activeStep])

  if (marks.length < 2) {
    return 'Loading...'
  }

  // Styled Slider component

  const Slider = styled(MuiSlider)(({ theme }) => ({
    height: 2,
    padding: '15px 0',
    color: theme.palette.primary.main,
    '& .MuiSlider-rail': {
      opacity: 0.5,
      backgroundColor: '#bfbfbf'
    },
    '& .MuiSlider-track': {
      border: 'none'
    },
    '& .MuiSlider-mark': {
      width: 1,
      height: 8,
      backgroundColor: '#bfbfbf',
      '&.MuiSlider-markActive': {
        opacity: 1,
        backgroundColor: 'currentColor'
      }
    },
    '& .MuiSlider-thumb': {
      width: 28,
      height: 28,
      border: 'none',
      backgroundColor: theme.palette.common.white,
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02) !important',

        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'
        }
      }
    },
    '& .MuiSlider-valueLabel': {
      top: 0,
      fontSize: 12,
      fontWeight: 'normal',
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&:before': {
        display: 'none'
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black
      }
    }
  }))

  return (
    <div className='flex flex-col gap-4 '>
      <Slider
        marks
        defaultValue={50}
        valueLabelDisplay='on'
        getAriaValueText={valuetext}
        aria-labelledby='label-always-visible-slider'
      ></Slider>
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

export default SliderStepNew
