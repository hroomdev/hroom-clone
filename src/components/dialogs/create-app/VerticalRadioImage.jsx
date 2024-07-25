import * as React from 'react'

import { useState, useEffect } from 'react'

import Grid from '@mui/material/Unstable_Grid2'

// MUI Imports
import Button from '@mui/material/Button'

// Components Imports
import CustomInputImg from '@core/components/custom-inputs/Image'

import DirectionalIcon from '@components/DirectionalIcon'

import { getQuestData as dbData } from '@/app/server/actions'

import handleChange from './SelectAnswerHandler.jsx'

let initialData = [
  {
    value: 'clock',
    isSelected: true,
    img: '/images/cards/5.png'
  }
]

const initialSelected = ''

var onClickNext = (f1, f2) => {
  f1()
  f2()
}

var onClickPrev = (f1, f2) => {
  f1()
  f2()
}

const answerCount = 4

const VerticalRadioImage = ({
  quizGroupTypeId,
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  setTitle,
  selectedOptions
}) => {
  //States sources
  const [selected, setSelected] = useState(initialSelected)
  const [data, setData] = useState(initialData)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      console.log('use effect called : VerticalRadioImage')
      await dbData().then(dbData => {
        var questionsubtitle = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].subtitle
        var answers = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].answers
        var imgSources = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].imgSrcs

        if (imgSources === 'undefined' || imgSources === undefined) return

        setTitle(questionsubtitle)

        //answers.length limited to four
        function readData() {
          for (let i = 0; i < answerCount; i++) {
            var iS = i.toString(10)
            var dataElement = {
              value: iS,
              isSelected: false,
              img: imgSources[i]
            }

            data[i] = dataElement
          }
        }

        readData()
        setData(data)

        setSelected(' ')
        setLoading(false)
      })
    }

    fetch()

    return unmount
  }, [])

  function unmount() {
    // States
    setSelected(initialSelected)
    setData(initialData)
    setLoading(true)
  }

  if (data.length <= 1 || isLoading) {
    return 'Loading...'
  }

  //
  //todo make dev not descendant of p

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={4}>
        <div className='flex flex-row space-between'>
          {data.map((item, index) => (
            <CustomInputImg
              type='radio'
              key={index}
              data={item}
              selected={selected}
              name='custom-radios-img'
              handleChange={strValue => {
                setSelected(strValue)
                var answerId = data.findIndex(item => item.value == strValue)

                handleChange(selectedOptions, activeStep, data.length, answerId)
              }}
              gridProps={{ sm: 4, xs: 12 }}
            >
              <p class='ft00'></p>
            </CustomInputImg>
          ))}
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

export default VerticalRadioImage
