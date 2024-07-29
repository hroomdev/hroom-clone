'use client'
import React, { useState } from 'react'

import dynamic from 'next/dynamic'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

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
import { intervalsru } from './screens/DashboardBuilder/TimeIntervals'

const byTeamru = 'по командам'
const perioudru = 'Период'

const DashboardBarChart = ({ propSelectedMetric }) => {
  const [selectedTimeInterval, setSelected] = useState('quarter') // Declare a state variable...

  const handleChange = event => {
    var key = Object.keys(intervalsru).find(key => intervalsru[key] === event.target.value)

    setSelected(key)
    console.log('metric is ' + key)
  }

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
      categories: ['Mon, 11', 'Thu, 14', 'Fri, 15', 'Mon, 18', 'Wed, 20', 'Fri, 21', 'Mon, 23'],
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
        title={metricsru[propSelectedMetric]}
        subheader={byTeamru}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />

      <CardContent>
        <AppReactApexCharts
          type='bar'
          width='100%'
          height={400}
          options={options}
          series={[{ data: [700, 350, 480, 600, 210, 550, 150] }]}
        />
      </CardContent>
    </Card>
  )
}

export default DashboardBarChart
