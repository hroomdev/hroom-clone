import * as React from 'react'

import { useState, useEffect } from 'react'

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

import { getQuestData as dbData } from '@/app/server/actions'

const VerticalRadioImage = ({ activeStep, isLastStep, handleNext, handlePrev, setTitle }) => {
  const initialData = [
    {
      value: 'clock',
      isSelected: true,
      img: '/images/cards/5.png'
    }
  ]

  const initialSelected = initialData.filter(item => item.isSelected)[
    initialData.filter(item => item.isSelected).length - 1
  ].value

  //States sources
  const [selected, setSelected] = useState(initialSelected)

  const [data, setData] = useState(initialData)

  const handleChange = prop => {
    console.log(prop)

    if (typeof prop === 'string') {
      setSelected(prop)
    } else if (typeof prop === 'int' || typeof prop === 'number') {
      setSelected(prop)
    } else {
      setSelected(prop.target.value)
    }
  }

  useEffect(() => {
    async function fetch() {
      await dbData().then(dbData => {
        var questionsubtitle = dbData.quiz1questions[activeStep].subtitle
        var answers = dbData.quiz1questions[activeStep].answers
        var imgSources = dbData.quiz1questions[activeStep].imgSrcs

        setTitle(questionsubtitle)

        function readData() {
          for (let i = 0; i < answers.length; i++) {
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

        setSelected(selected)
      })
    }

    fetch()

    return () => {}
  }, [data, selected])

  if (data.length < 2) {
    return 'Loading...'
  }

  return (
    <div className='flex flex-col gap-6'>
      <Grid container spacing={4}></Grid>
      <div className='flex flex-row space-between'>
        <p class='ft00'>
          Answer 1
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={0}
              data={data[0]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
        <p class='ft00'>
          Answer 2
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={1}
              data={data[1]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
        <p class='ft00'>
          Answer 3
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={2}
              data={data[2]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
        <p class='ft00'>
          Answer 4
          <div className='flex relative'>
            <CustomInputImg
              type='radio'
              key={3}
              data={data[3]}
              selected={selected}
              name='custom-radios-img'
              handleChange={handleChange}
              gridProps={{ sm: 10, xs: 12 }}
            ></CustomInputImg>
          </div>
        </p>
      </div>
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
