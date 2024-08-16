import * as React from 'react'

import { useEffect, useState } from 'react'

import Grid from '@mui/material/Unstable_Grid2'

// MUI Imports
import Button from '@mui/material/Button'

// Components Imports
import TextField from '@mui/material/TextField'

// MUI Imports

import DirectionalIcon from '@components/DirectionalIcon'

import { getQuestData as dbData } from '@/app/server/actions'

import handleChange, { handleChangeFollowUps } from './SelectAnswerHandler.jsx'

var onClickNext = (f1, f2) => {
  f1()
  f2()
}

var onClickPrev = (f1, f2) => {
  f1()
  f2()
}

const OpenQuestion = ({
  quizGroupTypeId,
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  setTitle,
  selectedOptions,
  followUps
}) => {
  //States sources

  function hanldeChange(e) {
    setInputText(e.target.value)

    console.log(e.target.value + '  e.target.value: OpqnQuiestion ')

    for (var i = 0; i < followUps.length; i++) {
      console.log(followUps.length + '  hanldeChange before handle  followUps.length : OpqnQuiestion ' + followUps[i])
    }

    handleChangeFollowUps(followUps, activeStep, e.target.value)

    for (var i = 0; i < followUps.length; i++) {
      console.log(followUps.length + '   handlechange after handle followUps.length : OpqnQuiestion' + followUps[i])
    }
  }

  const [isLoading, setLoading] = useState(true)
  const [inputText, setInputText] = useState(true)

  useEffect(() => {
    async function fetch() {
      console.log(quizGroupTypeId + 'use effect called : OpenQuestion activeStep ' + activeStep)
      await dbData(quizGroupTypeId).then(dbData => {
        var questionsubtitle = dbData[activeStep].subtitle
        var followup = dbData[activeStep].followup

        if (followup != undefined) {
          setTitle(followup)
        }

        setLoading(false)
      })
    }

    fetch()

    return unmount
  }, [])

  function unmount() {
    // States

    setTitle('     ')
    setLoading(true)
  }

  if (isLoading) {
    return 'Loading...'
  }

  //
  //todo make dev not descendant of p

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={4}>
        <div className='flex flex-row space-between'>
          <TextField
            fullWidth
            label='Введите ответ'
            name='quizname'
            variant='outlined'
            placeholder='California'
            value={inputText}
            onChange={e => hanldeChange(e)}
          />
        </div>
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

export default OpenQuestion
