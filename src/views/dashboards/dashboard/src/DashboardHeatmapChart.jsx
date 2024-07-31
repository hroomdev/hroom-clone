'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { metricsru } from './screens/DashboardBuilder/Metrics'
import { teamsru } from './screens/DashboardBuilder/Teams'

const titleru = 'Сравнение с рынком'
const subtitleru = 'По командам'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

//count is Category count
const updDataHeat = (seriesNameData, teamId, dataHeat, count) => {
  let i = 0 //metric Id
  const series = []

  //dataHeat i'th is metric id
  //dataHeat j'th is teamId

  while (i < count) {
    var metricKey = Object.keys(metricsru).at(i)
    var metricName = metricsru[metricKey]

    const x = metricName //`w${(i + 1).toString()}`
    const y = dataHeat[i][teamId].toFixed(1)

    series.push({
      x,
      y
    })
    i += 1
  }

  seriesNameData[teamId].data = series

  return seriesNameData
}

// Vars
const series = [
  {
    name: teamsru['benchmark'],
    data: []
  },
  {
    name: teamsru['whole'],
    data: []
  },
  {
    name: teamsru['management'],
    data: []
  },
  {
    name: teamsru['finance'],
    data: []
  },
  {
    name: teamsru['business'],
    data: []
  },
  {
    name: teamsru['development'],
    data: []
  },
  {
    name: teamsru['testing'],
    data: []
  }
]

const DashboardHeatmapChart = ({ teamsMetricStats, teamsMetricDiffStats }) => {
  for (var i = 0; i < series.length; i++) {
    updDataHeat(series, i, teamsMetricStats, teamsMetricStats.length)
  }

  // Hooks
  const theme = useTheme()

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      offsetX: theme.direction === 'rtl' ? 10 : -10
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: {
        colors: 'var(--mui-palette-text-secondary)'
      },
      markers: {
        height: 10,
        width: 10,
        offsetY: 0,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: {
        horizontal: 9
      }
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        colorScale: {
          ranges: [
            { to: 1, from: 0, name: '0-1', color: '#b9b3f8' },
            { to: 2, from: 1.1, name: '1-2', color: '#aba4f6' },
            { to: 3, from: 2.1, name: '2-3', color: '#9d95f5' },
            { to: 4, from: 3.1, name: '3-4', color: '#8f85f3' },
            { to: 5, from: 4.1, name: '4-5', color: '#8176f2' },
            { to: 6, from: 5.1, name: '5-6', color: '#7367f0' },
            { to: 7, from: 6.1, name: '6-7', color: '#7367f0' },
            { to: 8, from: 7.1, name: '7-8', color: '#7367f0' },
            { to: 9, from: 8.1, name: '8-9', color: '#7367f0' },
            { to: 10, from: 9.1, name: '9-10', color: '#7367f0' }
          ]
        }
      }
    },
    grid: {
      padding: { top: -20 }
    },
    yaxis: {
      labels: {
        style: { colors: 'var(--mui-palette-text-disabled)', fontSize: '13px' }
      }
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    }
  }

  return (
    <Card>
      <CardHeader title={titleru} />
      <p style={{ paddingLeft: '24px' }}> {subtitleru}</p>
      <CardContent>
        <AppReactApexCharts type='heatmap' width='100%' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default DashboardHeatmapChart
