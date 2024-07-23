'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

// Vars
const series = [
  {
    data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 5, 100, 2, 100, 50]
  },
  {
    data: [180, 100, 120, 80, 26, 50, 30, 30, 100, 50, 60, 10, 15, 1, 5]
  },
  {
    data: [80, 200, 26, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 19, 50]
  },
  {
    data: [40, 100, 120, 80, 80, 50, 30, 15, 100, 50, 60, 10, 15, 10, 5]
  },
  {
    data: [20, 300, 93, 180, 69, 250, 70, 30, 200, 150, 16, 200, 150, 100, 50]
  },
  {
    data: [8, 100, 6, 80, 80, 26, 30, 30, 100, 50, 60, 10, 15, 10, 5]
  },
  {
    data: [2, 200, 220, 64, 39, 250, 70, 49, 11, 200, 160, 100, 150, 100, 50]
  },
  {
    data: [150, 12, 120, 80, 80, 50, 30, 30, 2, 88, 60, 10, 15, 10, 5]
  },
  {
    data: [33, 100, 120, 30, 80, 15, 30, 30, 100, 50, 78, 10, 15, 10, 5]
  }
]

const DashboardApexLineChart = () => {
  // Hooks
  const theme = useTheme()

  // Vars
  //colors purple teal green pink bordeu greenlight red orange yellow
  const divider = 'var(--mui-palette-divider)'
  const disabledText = 'var(--mui-palette-text-disabled)'

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
    colors: ['#666EE8', '#66E8E8', '#1B9E0F', '#FF49F8', '#580354', '#35FF02', '#FF4961', '#FFC702', '#FFE802'],
    stroke: { curve: 'straight' },
    dataLabels: { enabled: false },
    markers: {
      strokeWidth: 7,
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
          <span>${data.series[data.seriesIndex][data.dataPointIndex]}%</span>
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
      categories: [
        '7/12',
        '8/12',
        '9/12',
        '10/12',
        '11/12',
        '12/12',
        '13/12',
        '14/12',
        '15/12',
        '16/12',
        '17/12',
        '18/12',
        '19/12',
        '20/12',
        '21/12'
      ]
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
        <AppReactApexCharts type='line' width='100%' height={337} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default DashboardApexLineChart
