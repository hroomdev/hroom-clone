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

var onClickNext = (f1, f2) => {
  f1()
  f2()
}

var onClickPrev = (f1, f2) => {
  f1()
  f2()
}

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
  const [selected, setSelected] = useState(initialSelected)
  const [marks, setMarks] = useState(initialMarks)
  const [isLoading, setLoading] = useState(true)

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

        //router.refresh()
        setLoading(false)
      })
    }

    fetch()

    return unmount
  }, [])

  function unmount() {
    // States
    setSelected(initialSelected)
    setLoading(true)
  }

  if (marks.length < 2 || isLoading) {
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

export default SliderScale
