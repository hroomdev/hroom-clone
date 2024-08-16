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

import { register } from './../../../../src/instrumentation'

// Third-party Imports

import SliderScale from './SliderScale'
import SliderStep from './SliderStep'
import StarRate from './StarRate'
import VerticalRadioImage from './VerticalRadioImage'
import VerticalRadioSVG from './VerticalRadioSVG'

import { createSelectedAnswersCurrentQuiz, getQuestData as dbData, getFollowUp } from '@/app/server/actions'

import { generateStatistics } from '@/app/server/dashboardstrategy'

import OpenQuestion from './OpenQuestion'
import { checkValidJoinedStr, checkValidJoinedStrFollowUps } from './TestAnswersValidity'

const initialSteps = 0

let selectedOptions = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
let followUps = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]

const renderStepCount = (quizGroupTypeId, activeStep, lastStep, handleNext, handlePrev, questionType, setTitle) => {
  if (questionType == '' || questionType == undefined) return <p></p>

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

const CreateApp = ({ open, setOpen, quizGroupTypeId }) => {
  const router = useRouter()

  var depVar = 1

  const [quizTypeId, setQuizTypeId] = useState(quizGroupTypeId)

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

    await dbData(quizTypeId).then(async data => {
      console.log(
        JSON.stringify(data) + ' data | quizTypeId' + quizTypeId + 'questionType dbdata fetch' + questionType + ' '
      )

      if (isFollowUp) {
        var followUp = await getFollowUp(quizTypeId, step)
        var questionType = 'followup'

        console.log('followUp' + followUp)
        var questionTitle = followUp

        //setSteps(data[].length)

        setQuestionType(questionType)
        setTitle(questionTitle)
        console.log('set loading false')
        setLoading(false)
      } else {
        var questionType = data[step].type

        var questionTitle = data[step].subtitle

        var steps = data.length

        if (followUps.length < steps) {
          //reinitialize based on 'steps' or questions and answers count
          followUps = Array(steps)

          Array.apply(null, followUps).map(function (x, i) {
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

        router.refresh()
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

      await dbData(quizTypeId).then(async data => {
        //save selected answers
        let qaArray = []

        for (var i = 0; i < selectedOptions.length; i++) {
          var a = data[i].answers[selectedOptions[i]]

          var q = data[i].subtitle

          qaArray.push('for question ' + q + '  answer ' + a)
        }

        let prompt = qaArray.join('/n')

        let optionsStr = selectedOptions.join(',')

        var departmentId = 7 //to separate generated and real data
        var employeeId = 1 //to separate generated and real data
        //save input text answers
        let followupsArray = []

        for (var i = 0; i < followUps.length; i++) {
          if (followUps[i] != undefined) {
            followupsArray.push(followUps[i])
          } else {
            followupsArray.push('')
          }
        }

        var followUpsStr = followupsArray.join(',')

        console.log('followUpsStr    ' + followUpsStr)

        if (
          checkValidJoinedStr(optionsStr, selectedOptions.length, 1, 10, 0) == false ||
          checkValidJoinedStrFollowUps(followUps, steps, steps) == false
        ) {
          console.logerror(
            'generate selectedanswers row selcetedoptions str error check validity of the slected options answers before send'
          )
        } else {
          let c = await createSelectedAnswersCurrentQuiz(optionsStr, followUpsStr, employeeId, departmentId)

          await generateStatistics(1, 1)

          await register()
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
              quizTypeId,
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
