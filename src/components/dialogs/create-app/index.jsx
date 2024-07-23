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

import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
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

const renderStepCount = (quizGroupTypeId, activeStep, isLastStep, handleNext, handlePrev, questionType, setTitle) => {
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
            : console.error('unknown question type ' + questionType)

  return (
    <Tag
      quizGroupTypeId={quizGroupTypeId}
      activeStep={activeStep}
      handleNext={handleNext}
      handlePrev={handlePrev}
      isLastStep={isLastStep}
      setTitle={setTitle}
      selectedOptions={selectedOptions}
    />
  )
}

let quizGroupTypeId = '1'

const CreateApp = ({ open, setOpen }) => {
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

  const router = useRouter()

  //states
  const [steps, setSteps] = useState(initialSteps)
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [questionType, setQuestionType] = useState('')
  const [title, setTitle] = useState('Create App')

  // Vars
  const isLastStep = activeStep === steps - 1

  function unmount() {
    return () => {}
  }

  useEffect(() => {
    async function fetch() {
      await dbData().then(data => {
        console.log(data.length)
        var questionType = data[Number.parseInt(quizGroupTypeId) - 1][activeStep].type
        var questionTitle = data[Number.parseInt(quizGroupTypeId) - 1][activeStep].subtitle

        setSteps(data[Number.parseInt(quizGroupTypeId) - 1].length)
        setLoading(false)
        setQuestionType(questionType)
        setTitle(questionTitle)
        router.refresh()
      })

      //let b = await makeOPENCHATAIGetRequest(prompt)
      //test db createQuiz
      //var formatted = format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date())
      //let c = await createQuiz(formatted, '2', '3')
    }

    fetch()

    return unmount
  }, [activeStep, steps])

  if (steps < 2) return <p>Loading...</p>
  if (isLoading) return <p>Loading...</p>
  if (questionType == '') return <p>No questionType</p>

  const handleClose = () => {
    setOpen(false)
    setActiveStep(0)
  }

  const handleNext = async () => {
    if (!isLastStep) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else {
      await dbData().then(async data => {
        let qaArray = []

        console.log('selectedOptions length' + selectedOptions + ' selectedOptions ' + selectedOptions.length)

        for (var i = 0; i < selectedOptions.length; i++) {
          var a = data[Number.parseInt(quizGroupTypeId) - 1][i].answers[selectedOptions[i]]
          var q = data[Number.parseInt(quizGroupTypeId) - 1][i].subtitle

          qaArray.push('for question ' + q + '  answer ' + a)
        }

        let prompt = qaArray.join('/n')

        //test db
        let selectedOptionsStr = selectedOptions.join(',')

        console.log('slopt ' + selectedOptionsStr)
        let c = await createSelectedAnswers(selectedOptionsStr, quizGroupTypeId)

        //let b = await makeOPENCHATAIGetRequest(prompt)
      })

      handleClose()
    }
  }

  const handlePrev = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
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
            {renderStepCount(quizGroupTypeId, activeStep, isLastStep, handleNext, handlePrev, questionType, setTitle)}
          </div>
        </div>
      </DialogContent>

      <CssVarsProvider theme={theme}>
        <div>
          <Switch defaultChecked />
          <Switch />
          <Switch disabled defaultChecked />
          <Switch disabled />
        </div>
      </CssVarsProvider>
    </Dialog>
  )
}

export default CreateApp
