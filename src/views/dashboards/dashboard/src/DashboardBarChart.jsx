'use client'

const local = 'ru-RU'
const en = 'en-GB'

import React, { useState } from 'react'

import dynamic from 'next/dynamic'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import ruLocale from 'date-fns/locale/ru'
import { compareAsc, parse } from 'date-fns'

// Next Imports
// Components Imports
import MenuItem from '@mui/material/MenuItem'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

import { metricsru } from './screens/DashboardBuilder/Metrics'
import { teamsru } from './screens/DashboardBuilder/Teams'
import { binaryFormat, midRangeRating } from '@/app/server/const'
import { intervalsru } from './screens/DashboardBuilder/TimeIntervals'

const byTeamru = 'по командам'
const perioudru = 'Период'

var seriesData = [] //700, 350, 480, 600, 210, 550, 150
var xAxisCategories = [] //'Mon, 11', 'Thu, 14', 'Fri, 15', 'Mon, 18', 'Wed, 20', 'Fri, 21', 'Mon, 23'

const DashboardBarChart = ({
  propSelectedMetricId,
  propSelectedTimeInterval,
  setSelectedTimeInterval,
  teamStats,
  teamMetricStory
}) => {
  console.log(JSON.stringify(teamMetricStory))

  const [selectedTimeInterval, setSelected] = useState(propSelectedTimeInterval) // Declare a state variable...

  const refreshText = selectedInterval => {
    var metricsKeyCategorySel = Object.keys(metricsru).findIndex(
      key => metricsru[key] == metricsru[propSelectedMetricId]
    )

    //reset data
    xAxisCategories = []
    seriesData = []

    var dateCutoff = new Date()

    if (selectedInterval == 'hour') {
      dateCutoff.setHours(dateCutoff.getHours() - 1)
    } else if (selectedInterval == 'day') {
      dateCutoff.setDate(dateCutoff.getDate() - 1)
    } else if (selectedInterval == 'week') {
      dateCutoff.setDate(dateCutoff.getDate() - 7)
    } else if (selectedInterval == 'month') {
      dateCutoff.setMonth(dateCutoff.getMonth() - 1)
    } else if (selectedInterval == 'quarter') {
      dateCutoff.setMonth(dateCutoff.getMonth() - 3)
    } else console.error('unknown time interval' + selectedInterval)

    //console.log('teamMetricStory.dateStamp.length ' + teamMetricStory.dateStamp.length)
    var teamMetricStoryFiltered = []

    for (var i = 0; i < teamMetricStory.dateStamp.length; i++) {
      var dateStampParsed = Date.parse(teamMetricStory.dateStamp[i])
      var dateParsed = new Date(dateStampParsed)

      //console.log(i + 'datestamp parsed tolocal ' + dateParsed.toLocaleString(local))
      //console.log('dateCutoff  tolocal ' + dateCutoff.toLocaleString(local))

      const result = compareAsc(dateCutoff, dateParsed)

      //=> -1

      if (result < 0) {
        teamMetricStoryFiltered.push(teamMetricStory.stats[i])
        console.log(
          'dateParsed ' +
            dateParsed +
            ' after date cutoff ' +
            dateCutoff +
            'push  teamMetricStoryFiltered.length' +
            teamMetricStoryFiltered.length
        )
      } else {
        console.log('dateParsed ' + dateParsed + ' before date cutoff ' + dateCutoff)
      }
    }

    console.log('teamMetricStoryFiltered.length ' + teamMetricStoryFiltered.length)

    //var teamMetricAvgInterval = [][]

    var teamMetricAvgInterval = new Array(teamMetricStoryFiltered[0].length).fill(0)

    console.log('teamMetricStoryFiltered[0].length ' + teamMetricStoryFiltered[0].length)

    for (var i = 0; i < teamMetricAvgInterval.length; i++) {
      teamMetricAvgInterval[i] = new Array(teamMetricStoryFiltered[0][0].length).fill(0)
      console.log('teamMetricStoryFiltered[0][0].length ' + teamMetricStoryFiltered[0][0].length)
    }

    for (var i = 0; i < teamMetricStoryFiltered.length; i++) {
      //9
      for (var j = 0; j < teamMetricStoryFiltered[i].length; j++) {
        //11
        for (var k = 0; k < teamMetricStoryFiltered[i][j].length; k++) {
          //13
          teamMetricAvgInterval[j][k] =
            teamMetricAvgInterval[j][k] + teamMetricStoryFiltered[i][j][k] / teamMetricStoryFiltered.length
        }
      }
    }

    console.log('teamMetricAvgInterval ' + JSON.stringify(teamMetricAvgInterval))
    console.log('teamMetricAvgIntervallength ' + teamMetricAvgInterval.length)
    console.log('teamMetricAvgInterval[0].lngth ' + teamMetricAvgInterval[0].length)

    var teamStatsFiltered = teamMetricAvgInterval //=teamStats

    for (var i = 0; i < 7; i++) {
      var categoryStatTeam = teamStatsFiltered[metricsKeyCategorySel][i].toFixed(1)

      seriesData.push(categoryStatTeam)
      var keyTeamName = Reflect.ownKeys(teamsru)[i]
      var teamName = teamsru[keyTeamName]

      xAxisCategories.push(teamName)
    }
  }

  const handleChange = event => {
    var key = Object.keys(intervalsru).find(key => intervalsru[key] === event.target.value)

    setSelected(key)
    setSelectedTimeInterval(key)
    console.log('metric is ' + key)
    refreshText(key)
  }

  //initialise refresh
  refreshText(propSelectedTimeInterval)

  // Hooks
  const theme = useTheme()

  // Vars
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      offsetX: theme.direction === 'rtl' ? 10 : -10
    },
    colors: ['#00cfe8'],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        barHeight: '30%',
        horizontal: true
      }
    },
    grid: {
      borderColor: divider,
      xaxis: {
        lines: { show: false }
      },
      padding: {
        top: -10
      }
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    },
    xaxis: {
      axisTicks: { show: false },
      categories: xAxisCategories,
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    }
  }

  return (
    <Card>
      <FormControl className='infoi' style={{ paddingLeft: '450px', width: '20%', alignItems: 'end' }}>
        {/*<InputLabel id='demo-simple-select-label'>{'Период'}</InputLabel>*/}
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={intervalsru[selectedTimeInterval]}
          label={intervalsru[selectedTimeInterval]}
          onChange={e => handleChange(e)}
        >
          <MenuItem value={intervalsru['hour']}>{intervalsru['hour']}</MenuItem>
          <MenuItem value={intervalsru['day']}>{intervalsru['day']}</MenuItem>
          <MenuItem value={intervalsru['week']}>{intervalsru['week']}</MenuItem>
          <MenuItem value={intervalsru['month']}>{intervalsru['month']}</MenuItem>
          <MenuItem value={intervalsru['quarter']}>{intervalsru['quarter']}</MenuItem>
        </Select>
      </FormControl>

      <CardHeader
        title={metricsru[propSelectedMetricId]}
        subheader={byTeamru}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />

      <CardContent>
        <AppReactApexCharts type='bar' width='100%' height={400} options={options} series={[{ data: seriesData }]} />
      </CardContent>
    </Card>
  )
}

export default DashboardBarChart
