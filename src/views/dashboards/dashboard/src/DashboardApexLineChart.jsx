'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import colorsOrd, { colorsRGBAChart } from '@/views/dashboards/dashboard/src/MetricsColors'
import { metricsru } from '@/views/dashboards/dashboard/src/screens/DashboardBuilder/Metrics'

const dayjs = require('dayjs')

const ruLocale = require('dayjs/locale/ru')

//,                         Invalid Date https://day.js.org/docs/en/display/format
//        formatter: function (val) {
//          return dayjs(val).format('MMM DD HH:mm')
//        }

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

//item.color

//{ stats, statsDiff }
const DashboardApexLineChart = ({ series, categories }) => {
  // Hooks
  const theme = useTheme()
  var seriesLocal = series
  var categoriesLocal = categories

  // Vars
  //colors purple teal green pink bordeu greenlight red orange yellow
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

  //['#666EE8', '#66E8E8', '#1B9E0F', '#FF49F8', '#580354', '#35FF02', '#FF4961', '#FFC702', '#FFE802'],
  var colorsA = []

  for (var key in colorsRGBAChart) {
    colorsA.push(colorsRGBAChart[key])
  }

  const options = {
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: 'var(--mui-palette-text-secondary)' },
      fontSize: '13px',
      markers: {
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 7 : -4
      },
      itemMargin: { horizontal: 9 },
      show: false
    },
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      offsetX: theme.direction === 'rtl' ? 10 : -10
    },

    colors: colorsA,
    stroke: {
      curve: 'smooth',
      width: '3'
    },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 5,
      strokeOpacity: 1,
      colors: ['#ff9f43'],
      strokeColors: ['#fff']
    },
    grid: {
      padding: { top: -10 },
      borderColor: divider,
      xaxis: {
        lines: { show: true }
      }
    },
    tooltip: {
      custom(data) {
        return `<div class='bar-chart'>
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}</span>
        </div>`
      }
    },
    yaxis: {
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: divider },
      crosshairs: {
        stroke: { color: divider }
      },
      labels: {
        style: { colors: disabledText, fontSize: '13px' }
      },
      categories: categoriesLocal
    }
  }

  return (
    <Card>
      <CardHeader
        title=''
        subheader=''
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
      />
      <CardContent>
        <AppReactApexCharts type='line' width='100%' height={337} options={options} series={seriesLocal} />
      </CardContent>
    </Card>
  )
}

export default DashboardApexLineChart
