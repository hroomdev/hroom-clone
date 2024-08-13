//original file were Edited not derived from original with renaming Dashboard...
'use client'
import { useEffect } from 'react'

// React Imports
import { useState } from 'react'

import { useRouter } from 'next/navigation'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports

import SliderScale from './SliderScale'
import SliderStep from './SliderStep'
import StarRate from './StarRate'
import VerticalRadioImage from './VerticalRadioImage'
import VerticalRadioSVG from './VerticalRadioSVG'

import { createSelectedAnswersCurrentQuiz, getQuestData as dbData } from '@/app/server/actions'

import { generateStatistics } from '@/app/server/dashboardstrategy'

import { checkValidJoinedStr } from './../../../../src/components/dialogs/create-app/TestSelectedOptionsValidity'
import OpenQuestion from './OpenQuestion'

const initialSteps = 0

let selectedOptions = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
let followUps = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

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
            : questionType.includes('followup')
              ? OpenQuestion
              : 'unknown'

  if (activeStep < 0) return <p></p>

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
      followUps={followUps}
    />
  )
}

let quizGroupTypeId = '1'

const CreateApp = ({ open, setOpen }) => {
  const router = useRouter()

  var depVar = 1

  const [steps, setSteps] = useState(initialSteps)
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [questionType, setQuestionType] = useState('')
  const [title, setTitle] = useState('Create App')

  async function unmount() {
    setLoading(true)
    setQuestionType('')
    setTitle('                      ')
  }

  async function fetch(step, isFollowUp) {
    if (step == -1 || activeStep < 0) {
      return
    }

    console.log('fetch step' + step + ' isFollowUp ' + isFollowUp)

    await dbData().then(async data => {
      console.log('questionType dbdata fetch' + questionType + ' ')

      if (isFollowUp) {
        var followUp = await getFollowUp(step)
        var questionType = 'followup'

        console.log('followUp' + followUp)
        var questionTitle = followUp

        //setSteps(data[Number.parseInt(quizGroupTypeId) - 1].length)

        setQuestionType(questionType)
        setTitle(questionTitle)
        console.log('set loading false')
        setLoading(false)
      } else {
        var questionType = data[Number.parseInt(quizGroupTypeId) - 1][step].type

        var questionTitle = data[Number.parseInt(quizGroupTypeId) - 1][step].subtitle

        var steps = data[Number.parseInt(quizGroupTypeId) - 1].length

        if (followUps.length < steps) {
          //reinitialize based on 'steps' or questions and answers count
          followUps = Array(5)

          Array.apply(null, Array(5)).map(function (x, i) {
            return -1
          })

          //followUps = Array.from(x.repeat(-1))

          console.log('followUps ' + JSON.stringify(followUps) + '   ' + followUps + ' reinitialize fetch : index.jsx')
        } else {
          console.log('followUps length' + followUps.length)

          console.log('steps' + steps)
        }

        setSteps(steps)

        setQuestionType(questionType)

        setTitle(questionTitle)

        console.log('set loading false')

        setLoading(false)
      }
    })
  }

  useEffect(() => {
    fetch(activeStep, false)

    return unmount
  }, [depVar])

  const delay = time => new Promise(res => setTimeout(res, time))

  const handleClose = async () => {
    setOpen(false)
    setActiveStep(-1)
    await unmount()
    await fetch(-1, false)
  }

  const handlePrev = async () => {
    if (activeStep > 0) {
      await unmount()
      await fetch(activeStep - 1, false)

      setActiveStep(prevActiveStep => prevActiveStep - 1)
    } else {
      console.logerror('activestep is zero cant go prev!')
    }
  }

  const getFollowUp = async step => {
    return await dbData().then(data => {
      console.log('   dbData  ' + data + '  ' + step)

      return data[Number.parseInt(quizGroupTypeId) - 1][step].followup
    })
  }

  const handleNext = async () => {
    var followUp = await getFollowUp(activeStep)

    console.log('followUp JSON ' + JSON.stringify(followUp) + followUp + 'followUp')

    console.log('questionType ' + questionType)
    console.log('followUp JSON ' + JSON.stringify(followUp) + followUp + 'followUp')
    console.log('followUp != undefined ' + followUp != undefined)
    console.log('followUp != null ' + followUp != null)
    console.log('followUp != ' + followUp != '')

    if (
      questionType != undefined &&
      questionType != '' &&
      questionType != 'followup' &&
      followUp != undefined &&
      followUp != null &&
      followUp != ''
    ) {
      console.log('is follow up : index.js')

      await unmount()
      await fetch(activeStep, true)

      return
    } else {
      console.log('is NOT follow up : index.js')
    }

    if (!(activeStep + 1 >= steps)) {
      await unmount()
      await fetch(activeStep + 1)

      setActiveStep(prevActiveStep => prevActiveStep + 1)
    } else {
      await handleClose()

      await dbData().then(async data => {
        let qaArray = []

        console.log('selected options ' + selectedOptions.length)
        console.log('followups length  ' + followUps.length)

        //save selected answers

        for (var i = 0; i < selectedOptions.length; i++) {
          var a = data[Number.parseInt(quizGroupTypeId) - 1][i].answers[selectedOptions[i]]

          var q = data[Number.parseInt(quizGroupTypeId) - 1][i].subtitle

          qaArray.push('for question ' + q + '  answer ' + a)
        }

        let prompt = qaArray.join('/n')

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

        //save input text answers
        for (var i = 0; i < followUps.length; i++) {
          console.log('followUps    ' + followUps[i])
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
      {}
    </Dialog>
  )
}

export default CreateApp
