// React Imports
import * as React from 'react'

import { useState, useEffect, useLayoutEffect } from 'react'

import { useRouter } from 'next/navigation'

import Grid from '@mui/material/Unstable_Grid2'

// MUI Imports
import Button from '@mui/material/Button'

//import Grid from '@mui/material/Grid'

import DirectionalIcon from '@components/DirectionalIcon'

// Components Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'

import { getQuestData as dbData } from '@/app/server/actions'

const SVGs = [
  {
    asset: (
      <svg fill='#000000' width='100px' height='100px' viewBox='0 0 471.612 471.612'>
        <path
          d='M68.987,402.624c91.98,91.983,241.652,91.983,333.636,0c91.983-91.977,91.983-241.658,0-333.639s-241.655-91.98-333.636,0
		S-22.993,310.642,68.987,402.624z M87.29,87.276c81.899-81.896,215.152-81.896,297.052,0c81.882,81.894,81.882,215.154,0,297.055
		c-81.899,81.887-215.164,81.887-297.052,0C5.394,302.431,5.394,169.17,87.29,87.276z'
        />
      </svg>
    )
  }
]

let initialData = [
  {
    value: '',
    title: '',
    isSelected: false,
    content: ''
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

var loadedStep = 0

const VerticalRadioSVG = ({
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

  // States

  const [selected, setSelected] = useState(initialSelected)
  const [data, setData] = useState(initialData)
  const [isLoading, setLoading] = useState(true)

  const handleChange = prop => {
    if (typeof prop === 'string') {
      setSelected(prop)
      selectedOptions[activeStep] = prop
    } else if (typeof prop === 'int' || typeof prop === 'number') {
      setSelected(prop)
      selectedOptions[activeStep] = prop
    } else {
      setSelected(prop.target.value)
      selectedOptions[activeStep] = prop.target.value
    }
  }

  useEffect(() => {
    async function fetch() {
      //setData(initialData)

      await dbData().then(dbData => {
        //var loadedStepNumber = loadedStep
        var questionsubtitle = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].subtitle
        var answers = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].answers
        var imgSources = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].imgSources

        setTitle(questionsubtitle)

        function readData() {
          for (let i = 0; i < answers.length; i++) {
            var dataElement = {
              value: i,
              title: '',
              isSelected: false,
              content: answers[i]
            }

            data[i] = dataElement
          }
        }

        readData()
        setData(data)

        setSelected(selected)
        setLoading(false)

        //router.refresh()
      })
    }

    fetch()

    return unmount

    //
  }, [activeStep])

  function unmount() {
    // States
    setSelected(initialSelected)
    setData(initialData)
    setLoading(true)
  }

  if (data.length < 2 || isLoading) {
    return 'Loading...'
  }

  return (
    <div className='flex flex-col auto gap-16'>
      <div className='flex flex-row 2 auto'>
        <Grid container spacing={4}>
          {data.map((item, index) => {
            return (
              <CustomInputVertical
                type='radio'
                key={index}
                data={{ ...item, asset: SVGs[0].asset }}
                selected={selected}
                name='custom-radios-icons'
                handleChange={handleChange}
                gridProps={{ sm: 4, xs: 12 }}
              />
            )
          })}
        </Grid>
      </div>

      <div className='flex items-center justify-between'>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeStep === 0 || isLoading === true}
          onClick={onClickPrev.bind(this, () => {}, handlePrev)}
          startIcon={<DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={isLastStep ? 'success' : 'primary'}
          disabled={isLastStep === true || isLoading === true}
          onClick={onClickNext.bind(this, () => {}, handleNext)}
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

export default VerticalRadioSVG
