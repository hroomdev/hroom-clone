import * as React from 'react'

import { useState, useEffect } from 'react'

import Grid from '@mui/material/Unstable_Grid2'

// MUI Imports
import Button from '@mui/material/Button'

// Components Imports
import CustomInputImg from '@core/components/custom-inputs/Image'

import DirectionalIcon from '@components/DirectionalIcon'

import { getQuestData as dbData } from '@/app/server/actions'

let initialData = [
  {
    value: 'clock',
    isSelected: true,
    img: '/images/cards/5.png'
  }
]

//let initialSelected = initialData.filter(item => item.isSelected)[
//  initialData.filter(item => item.isSelected).length - 1
//].value

let initialSelected = ''

const VerticalRadioImage = ({
  quizGroupTypeId,
  activeStep,
  isLastStep,
  handleNext,
  handlePrev,
  setTitle,
  selectedOptions
}) => {
  console.log('VerticalRadioImage quizGroupTypeId' + quizGroupTypeId + 'active step' + activeStep)

  //States sources
  const [selected, setSelected] = useState(initialSelected)

  const [data, setData] = useState(initialData)

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
      await dbData().then(dbData => {
        var questionsubtitle = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].subtitle
        var answers = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].answers
        var imgSources = dbData[Number.parseInt(quizGroupTypeId) - 1][activeStep].imgSrcs

        if (imgSources === 'undefined' || imgSources === undefined) return

        setTitle(questionsubtitle)

        //answers.length limited to four
        function readData() {
          for (let i = 0; i < 4; i++) {
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
      })
    }

    fetch()

    return () => {}
  }, [activeStep])

  if (data.length < 2) {
    return 'Loading...'
  }

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
              handleChange={handleChange}
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
