'use client'
import { useEffect } from 'react'

// React Imports
import { useState } from 'react'

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

//import { getEcommerceData } from './../../../app/server/actions'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'

import { getQuestData as dbData } from '@/app/server/actions'

const initialSteps = 0

const renderStepCount = (activeStep, isLastStep, handleNext, handlePrev, questionType, setTitle) => {
  const Tag =
    questionType === 'dots'
      ? VerticalRadioSVG
      : questionType === 'slider'
        ? SliderStep
        : questionType === 'image'
          ? VerticalRadioImage
          : questionType === 'rate'
            ? StarRate
            : SliderScale

  return (
    <Tag
      activeStep={activeStep}
      handleNext={handleNext}
      handlePrev={handlePrev}
      isLastStep={isLastStep}
      setTitle={setTitle}
    />
  )
}

const CreateApp = ({ open, setOpen }) => {
  // States
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
        //setActiveStep(actStep)
        var questionType = data.quiz1questions[activeStep].type

        console.log('questions length ' + data.quiz1questions.length)
        setSteps(data.quiz1questions.length)
        setLoading(false)
        setQuestionType(questionType)
      })
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

  const handleStep = step => () => {
    setActiveStep(step)
  }

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else {
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
          {activeStep}/{steps.length - 1}
        </Typography>
      </DialogTitle>
      <DialogContent className='pbs-0 sm:pli-16 sm:pbe-16'>
        <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
        <div className='flex gap-y-6 pbs-1 flex-col md:flex-row'>
          <div className='flex-1'>
            {renderStepCount(activeStep, isLastStep, handleNext, handlePrev, questionType, setTitle)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateApp
