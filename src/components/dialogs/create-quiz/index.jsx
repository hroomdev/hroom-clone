'use client'

// React Imports
import * as React from 'react'

import { useEffect, useLayoutEffect, useState } from 'react'

// Components Imports
import { setDate } from 'date-fns'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// MUI Imports
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'


import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { teamsru } from './../../../views/dashboards/dashboard/src/screens/DashboardBuilder/Teams'

import { createQuiz, getEmployeesCountByDepartmentId } from '../../../app/server/actions'

const dayjs = require('dayjs')

const title = 'Назначить опрос'

var formatDate = require('date-format')

const QuizWizard = ({ open, setOpen }) => {
  function makeid(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }

    return result
  }

  let initialHelpMsg = ''
  let initialType = '1'
  let initialTimeStart = dayjs(new Date())

  let initialTeamAuditoryTeamId = 0 //zero is according to 'analytics' key

  let initialSurveyName = makeid(12)

  let initialEndDate = dayjs(new Date())

  var initialAuditoryCount = 0

  const title = 'Назначить опрос'

  var handleClose = async (event, reason) => {
    console.log(event.target.name + ' event.target    reason' + reason)

    //JSON.stringify(event.target)

    if (reason && reason === 'backdropClick') {
      console.log('return after backdropClick')

      //event.preventDefault()
      return
    }

    setOpen(false)
  }

  var handleChangeType = async event => {
    var key = event.target.value

    setType(key)
  }

  // States

  const [type, setType] = useState(initialType)
  const [timeStart, setTimeStart] = useState(initialTimeStart)
  const [teamId, setTeamId] = useState(initialTeamAuditoryTeamId)

  const [auditoryCount, setAuditoryCount] = useState(initialAuditoryCount)

  const [surveyName, setSurveyName] = useState(initialSurveyName)
  const [endDate, setEndDate] = useState(initialEndDate)

  const [isLoading, setLoading] = useState(false)

  const [helpMsg, setHelpMsg] = useState(initialHelpMsg)

  const onTeamIdChange = async e => {
    var newTeamId = Object.keys(teamsru).findIndex(key => teamsru[key] == e.target.value)
    var newTeamKey = Object.keys(teamsru).find(key => teamsru[key] == e.target.value)
    var newTeamName = teamsru[newTeamKey]

    setTeamId(newTeamId)

    refreshUI(newTeamId, newTeamName)

    if (!isLoading) {
      //console.log('not loading ')
    } else {
      //console.log('loading ')
    }
  }

  const refreshUI = async (newTeamId, teamName) => {
    setLoading(true)

    await getEmployeesCountByDepartmentId(newTeamId).then(rsult => {
      setAuditoryCount(rsult)

      if (rsult <= 0) {
        setHelpMsg('В команде   ' + teamName + ' нет никого выбери другую аудиторию')
      } else {
        setHelpMsg('')
      }

      setLoading(false)
    })
  }

  const handleCreate = async () => {
    var dateNow = timeStart.toDate()
    const endDateSurvey = endDate.toDate()
    var formattedDateNow = formatDate(format.ISO8601_WITH_TZ_OFFSET_FORMAT, dateNow)
    var formattedEndDate = formatDate(format.ISO8601_WITH_TZ_OFFSET_FORMAT, endDateSurvey)
    var quizTypeId = initialType
    var randomName = surveyName

    ////dayjs frmat

    let c = await createQuiz(formattedDateNow, quizTypeId, auditoryCount, formattedEndDate, randomName)

    console.log('create quiz result ' + c)
  }

  useEffect(() => {
    async function fetch() {
      if (!isLoading) {
        var newTeamKey = Object.keys(teamsru).at(teamId)
        var newTeamName = teamsru[newTeamKey]

        refreshUI(teamId, newTeamName)
      }
    }

    fetch()

    return unmount

    //
  }, [teamId])

  function unmount() {
    // States
    //setType(initialType)
    //setTimeStart(initialTimeStart)
    //setTeamId(initialTeamAuditoryTeamId)
    //setSurveyName(initialSurveyName)
    //setEndDate(initialEndDate)
    //setLoading(initialEndDate)
  }

  return (
    <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose} scroll='body'>
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16 '>
        {title}
        <Typography component='span' className='flex flex-col text-right'>
          {helpMsg}
        </Typography>
      </DialogTitle>
      {}
      <DialogContent className='pbs-5 sm:pli-16 sm:pbe-16'>
        <IconButton onClick={handleClose} className='absolute block-start-4 inline-end-4'>
          <i className='ri-close-line text-textSecondary' />
        </IconButton>
        <div className='flex gap-y-6 pbs-5 flex-col md:flex-row'>
          <div className='flex-1'>
            <InputLabel id='demo-simple-select-label'>Тип</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={type}
              label='Тип'
              onChange={e => handleChangeType(e)}
            >
              <MenuItem value={'1'}>1</MenuItem>
              <MenuItem value={'2'}>2</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker label='Дата начала' value={timeStart} onChange={newValue => setTimeStart(newValue)} />

              <DateTimePicker label='Дата окончания' value={endDate} onChange={newValue => setEndDate(newValue)} />
            </LocalizationProvider>
            <TextField
              fullWidth
              label='Название опроса'
              name='quizname'
              variant='outlined'
              placeholder='California'
              value={surveyName}
              onChange={e => setSurveyName(e.target.value)}
            />

            <InputLabel id='demo-simple-select-label'>
              {!isLoading && 'Аудитория - команда - ' + auditoryCount}
              {isLoading && 'Загрузка данных команды...'}
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={teamsru[Object.keys(teamsru).at(teamId)]}
              label='Тип'
              onChange={e => {
                onTeamIdChange(e)
              }}
            >
              {Object.keys(teamsru).map((item, pos) => {
                return (
                  <MenuItem key={item} value={teamsru[item]}>
                    {teamsru[item]}
                  </MenuItem>
                )
              })}
            </Select>

            <Button
              variant='contained'
              color={'primary'}
              disabled={auditoryCount <= 0 || isLoading === true}
              onClick={handleCreate.bind(this)}
              endIcon={<i className='ri-check-line' />}
            >
              {'ОК'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default QuizWizard
