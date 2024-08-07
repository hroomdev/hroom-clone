//original file were Edited not derived from original with renaming Dashboard...
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

//import { useNavigate } from 'react-router-dom'

import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider
} from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

import teamsru from '@/app/../components/../views/dashboards/dashboard/src/screens/DashboardBuilder/Teams'
import employeesru from '@/app/../components/../views/dashboards/dashboard/src/screens/DashboardBuilder/Employees'

import generateOptions, { getRandomInt } from '../../dialogs/create-app/GenerateQuizSelectedOptions'

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

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'

import { getQuestData as dbData, createSelectedAnswersCurrentQuiz } from '@/app/server/actions'

import { generateStatistics } from '@/app/server/dashboardstrategy'

import { checkValidJoinedStr } from './../../../../src/components/dialogs/create-app/TestSelectedOptionsValidity'

const initialSteps = 0

let selectedOptions = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

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
            : 'unknown'

  if (activeStep < 0) return <p></p>

  //if (steps < 2) return <p></p>
  //if (isLoading) return <p></p>
  if (questionType == '') return <p></p>

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
  var depVar = 1

  //hideVerticalMenu()

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
    setTitle('                      ')
  }

  async function fetch(step) {
    if (step == -1 || activeStep < 0) {
      return
    }

    await dbData().then(data => {
      //await unmount()
      //onsole.logerror('step to fetch -1 : index.jsx should be 0 to n')

      var questionType = data[Number.parseInt(quizGroupTypeId) - 1][step].type
      var questionTitle = data[Number.parseInt(quizGroupTypeId) - 1][step].subtitle

      setSteps(data[Number.parseInt(quizGroupTypeId) - 1].length)

      setQuestionType(questionType)
      setTitle(questionTitle)
      console.log('set loading false')
      setLoading(false)
    })

    //let b = await makeOPENCHATAIGetRequest(prompt)
  }

  useEffect(() => {
    fetch(activeStep)

    return unmount
  }, [depVar])

  //if (activeStep < 0) return <p></p>
  //if (steps < 2) return <p></p>
  //if (isLoading) return <p></p>
  //if (questionType == '') return <p></p>

  const delay = time => new Promise(res => setTimeout(res, time))

  const handleClose = async () => {
    setOpen(false)
    setActiveStep(-1)
    await unmount()
    await fetch(-1)

    //router.push('/ru//dashboards/dashboard') //
    //router.prefetch('/ru//dashboards/dashboard')
    //router.refresh() //instantly calls hide through  collapseVerticalNav(true) useEffect Navigation

    //await delay(1000)
    //showVerticalMenu() //calls show through  collapseVerticalNav(false)navCollapseVerticalNav
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

        console.log('selected options ' + selectedOptions.length)

        for (var i = 0; i < selectedOptions.length; i++) {
          var a = data[Number.parseInt(quizGroupTypeId) - 1][i].answers[selectedOptions[i]]
          var q = data[Number.parseInt(quizGroupTypeId) - 1][i].subtitle

          qaArray.push('for question ' + q + '  answer ' + a)
        }

        let prompt = qaArray.join('/n')

        //test db

        let optionsStr = selectedOptions.join(',')

        var departmentId = 7 //to separate generated and real data
        var employeeId = 1 //to separate generated and real data

        if (checkValidJoinedStr(optionsStr, selectedOptions.length, 1, 10, 0) == false) {
          console.logerror('generate quiz report error check validity of the slected options answers before send')
        } else {
          let c = await createSelectedAnswersCurrentQuiz(optionsStr, employeeId, departmentId)
          await generateStatistics(1, 1)
          console.log('selected options   ' + c)
        }
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
      <DialogContent className='pbs-5 sm:pli-16 sm:pbe-16'>
        <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
        <div className='flex gap-y-6 pbs-5 flex-col md:flex-row'>
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
