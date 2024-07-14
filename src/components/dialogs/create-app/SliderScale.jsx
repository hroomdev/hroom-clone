import * as React from 'react'

import { useState, useEffect } from 'react'

import Slider from '@mui/material/Slider'

// MUI Imports
import Button from '@mui/material/Button'

//import Grid from '@mui/material/Grid'

import DirectionalIcon from '@components/DirectionalIcon'
import { getQuestData as dbData } from '@/app/server/actions'

let initialMarks = [
  {
    value: 0,
    label: '0°'
  }
]

const SliderScale = ({ activeStep, isLastStep, handleNext, handlePrev, setTitle }) => {
  const initialSelected = 0

  const [marks, setMarks] = useState(initialMarks)

  const valuetext = value => {
    return `${value}°C`
  }

  useEffect(() => {
    async function fetch() {
      await dbData().then(dbData => {
        var questionsubtitle = dbData.quiz1questions[activeStep].subtitle
        var answers = dbData.quiz1questions[activeStep].answers

        setTitle(questionsubtitle)

        function readMarks() {
          for (let i = 0; i < answers.length; i++) {
            var num = (i + 1) * 10

            var markElement = {
              value: i,
              label: 'z'
            }

            marks[i] = markElement
          }
        }

        readMarks()
        setMarks(marks)

        console.log('max = legnth marks * 10 + 10 ' + (10 + (marks.length - 1) * 10)) //marks.length
      })
    }

    fetch()
  }, [marks])

  if (marks.length < 2) {
    return 'Loading...'
  }

  return (
    <div className='flex flex-col gap-4 '>
      <Slider
        marks
        min={0}
        max={(marks.length - 1) * 10}
        step={10}
        defaultValue={0}
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

export default SliderScale
