import * as React from 'react'

import { useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import Slider from '@mui/material/Slider'

// MUI Imports
import Button from '@mui/material/Button'

//import Grid from '@mui/material/Grid'

import DirectionalIcon from '@components/DirectionalIcon'
import { getQuestData as dbData } from '@/app/server/actions'

const stepSize = 10
let initialMarks = [
  {
    value: 0,
    label: '0°'
  }
]

const SliderScale = ({
  quizGroupTypeId,
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  setTitle,
  selectedOptions
}) => {
  const initialSelected = 0
  const router = useRouter()
  const [marks, setMarks] = useState(initialMarks)

  const valuetext = value => {
    selectedOptions[activeStep] = Math.round(value != 0 ? value / stepSize : value)

    return `${value}°C`
  }

  useEffect(() => {
    async function fetch() {
      await dbData().then(dbData => {
        var questionsubtitle = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].subtitle
        var answers = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].answers

        setTitle(questionsubtitle)

        function readMarks() {
          for (let i = 0; i < answers.length; i++) {
            var num = (i + 1) * stepSize

            var markElement = {
              value: i,
              label: 'z'
            }

            marks[i] = markElement
          }
        }

        readMarks()
        setMarks(marks)
        router.refresh()
      })
    }

    fetch()
  }, [activeStep])

  if (marks.length < 2) {
    return 'Loading...'
  }

  return (
    <div className='flex flex-col gap-4 '>
      <Slider
        marks
        min={0}
        max={(marks.length - 1) * stepSize}
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
