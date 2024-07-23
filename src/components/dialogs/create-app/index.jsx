'use client'
import { useEffect } from 'react'

// React Imports
import { useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Avatar from '@mui/material/Avatar'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'

//import { useNavigate } from 'react-router-dom'

import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

import { hideVerticalMenu, showVerticalMenu } from './../../../components/layout/vertical/Navigation'

import Details from './Details'
import FrameWork from './FrameWork'
import VerticalRadioImage from './VerticalRadioImage'
import VerticalRadioSVG from './VerticalRadioSVG'
import SliderScale from './SliderScale'
import SliderStep from './SliderStep'
import StarRate from './StarRate'
import Database from './Database'
import Billing from './Billing'
import Submit from './Submit'
import makeOPENCHATAIGetRequest from '../../../app/server/aichatgpt'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'

import { getQuestData as dbData, createQuiz, createSelectedAnswers } from '@/app/server/actions'

var format = require('date-format')

const initialSteps = 0

let selectedOptions = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

//let selectedOptions = [4, 5, 5, 5, 5, 5, 3, 3, 3, 1, 2] //test data

const renderStepCount = (quizGroupTypeId, activeStep, lastStep, handleNext, handlePrev, questionType, setTitle) => {
  const Tag = questionType.includes('dots')
    ? VerticalRadioSVG
    : questionType.includes('slider')
      ? SliderStep
      : questionType.includes('image')
        ? VerticalRadioImage
        : questionType.includes('stars')
          ? StarRate
          : questionType.includes('scale')
            ? SliderScale
            : console.log('unknown question type ' + questionType)

  return (
    <Tag
      quizGroupTypeId={quizGroupTypeId}
      activeStep={activeStep}
      handleNext={handleNext}
      handlePrev={handlePrev}
      isLastStep={lastStep}
      setTitle={setTitle}
      selectedOptions={selectedOptions}
    />
  )
}

let quizGroupTypeId = '1'

const CreateApp = ({ open, setOpen }) => {
  const router = useRouter()

  hideVerticalMenu()

  const theme = extendTheme({
    shape: {
      borderRadiusRound: 999
    },
    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            '&.MuiSwitch-sizeMedium:has(.MuiSwitch-colorPrimary)': {
              width: '40px',
              height: '21px',
              padding: '0',
              '& .MuiSwitch-switchBase': {
                padding: '0',
                '& .MuiSwitch-thumb': {
                  width: '17px',
                  height: '17px',
                  background: '#FAFAFA'
                },
                '& + .MuiSwitch-track': {
                  width: '38px',
                  height: '21px',
                  borderRadius: '100px',
                  opacity: '1'
                }
              },
              '&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(3px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    background: '#BDBDBD'
                  }
                }
              },
              '&:not(:has(.Mui-checked)):has(.Mui-disabled):not(:has(.Mui-focusVisible))': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(3px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    background: 'rgba(229, 229, 229, 0.99)'
                  }
                }
              },
              '&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):has(.Mui-focusVisible)': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(3px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    border: '1px solid #000',
                    background: '#BDBDBD'
                  }
                }
              },
              '&:has(.Mui-checked):has(.Mui-disabled):not(:has(.Mui-focusVisible))': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    background: 'rgba(187, 231, 188, 0.99)'
                  }
                }
              },
              '&:not(:has(.Mui-checked)):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible)):hover': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(3px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    background: '#616161'
                  }
                }
              },
              '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible))': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    background: 'var(--mui-palette-success-light)'
                  }
                }
              },
              '&:has(.Mui-checked):not(:has(.Mui-disabled)):not(:has(.Mui-focusVisible)):hover': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    background: 'var(--mui-palette-success-dark)'
                  }
                }
              },
              '&:has(.Mui-checked):not(:has(.Mui-disabled)):has(.Mui-focusVisible)': {
                '& .MuiSwitch-switchBase': {
                  transform: 'translateX(19px) translateY(2px)',
                  '& + .MuiSwitch-track': {
                    border: '1px solid #000',
                    background: 'var(--mui-palette-success-light)'
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  //states
  const [steps, setSteps] = useState(initialSteps)
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [questionType, setQuestionType] = useState('')
  const [title, setTitle] = useState('Create App')

  async function unmount() {
    //setActiveStep(initialSteps)

    //setActiveStep(0)
    setLoading(true)
    setQuestionType('')
    setTitle('                       ')
  }

  async function fetch(step) {
    await dbData().then(data => {
      if (step == -1) {
        unmount()
        console.logerror('step to fetch -1 : index.jsx should be 0 to n')

        return
      }

      var questionType = data[Number.parseInt(quizGroupTypeId) - 1][step].type
      var questionTitle = data[Number.parseInt(quizGroupTypeId) - 1][step].subtitle

      setSteps(data[Number.parseInt(quizGroupTypeId) - 1].length)

      setQuestionType(questionType)
      setTitle(questionTitle)
      setLoading(false)
    })

    //let b = await makeOPENCHATAIGetRequest(prompt)
    //test db createQuiz
    //var formatted = format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date())
    //let c = await createQuiz(formatted, '2', '3')
  }

  useEffect(() => {
    fetch(activeStep)

    return unmount
  }, [])

  if (steps < 2) return <p>Loading...</p>
  if (isLoading) return <p>Loading...</p>
  if (questionType == '') return <p>Loading...</p>

  const delay = time => new Promise(res => setTimeout(res, time))

  const handleClose = async () => {
    //setOpen(false)
    await unmount()

    //navigate('/dashboards/dashboard')
    router.push('/ru//dashboards/dashboard')

    router.refresh()
    showVerticalMenu()
    await delay(5000)

    await fetch(0)
    setActiveStep(0)
  }

  const handlePrev = async () => {
    if (activeStep > 0) {
      await unmount()
      await fetch(activeStep - 1)
      setActiveStep(prevActiveStep => prevActiveStep - 1)
    } else {
      console.logerror('activestep is zero cant go prev!')
    }
  }

  const handleNext = async () => {
    if (!(activeStep + 1 >= steps)) {
      await unmount()
      await fetch(activeStep + 1)
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else {
      await handleClose()
      await dbData().then(async data => {
        let qaArray = []

        for (var i = 0; i < selectedOptions.length; i++) {
          var a = data[Number.parseInt(quizGroupTypeId) - 1][i].answers[selectedOptions[i]]
          var q = data[Number.parseInt(quizGroupTypeId) - 1][i].subtitle

          qaArray.push('for question ' + q + '  answer ' + a)
        }

        let prompt = qaArray.join('/n')

        //test db
        let selectedOptionsStr = selectedOptions.join(',')

        let c = await createSelectedAnswers(selectedOptionsStr, quizGroupTypeId)

        //let b = await makeOPENCHATAIGetRequest(prompt)
      })
    }
  }

  const valuetext = value => {
    return `${activeStep}/${steps.length - 1}`
  }

  return (
    <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose} scroll='body'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16 '>
        {title}
        <Typography component='span' className='flex flex-col text-right'>
          {activeStep + 1}/{steps}
        </Typography>
      </DialogTitle>
      <DialogContent className='pbs-0 sm:pli-16 sm:pbe-16'>
        <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
        <div className='flex gap-y-6 pbs-1 flex-col md:flex-row'>
          <div className='flex-1'>
            {renderStepCount(
              quizGroupTypeId,
              activeStep,
              activeStep >= steps - 1,
              handleNext,
              handlePrev,
              questionType,
              setTitle
            )}
          </div>
        </div>
      </DialogContent>
      {/*
      <CssVarsProvider theme={theme}>
        <div>
          <Switch defaultChecked />
          <Switch />
          <Switch disabled defaultChecked />
          <Switch disabled />
        </div>
      </CssVarsProvider>
      */}
    </Dialog>
  )
}

export default CreateApp
