'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

//{/*colors: ['var(--mui-palette-info-main)'],*/}
// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

const DashboardRadialBarChart = () => {
  const radialBarColors = {
    series1: '#56ca00',
    series2: 'rgba(255, 195, 51, 1)',
    series3: 'rgba(239, 83, 80, 1)',
    series4: 'rgba(138, 141, 147, 0.38)'
  }

  const series = [22, 25, 21, 32]

  const options = {
    labels: ['Вовлеченные', 'Слабо вовлеченные', 'Невовлеченные', 'Пропустили'],
    chart: {
      sparkline: { enabled: true }
    },
    grid: {
      padding: {
        top: -10,
        bottom: 20
      }
    },
    stroke: {
      lineCap: 'square',
      curve: 'straight'
    },
    colors: [radialBarColors.series1, radialBarColors.series2, radialBarColors.series3, radialBarColors.series4],
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '60%' },
        track: { background: 'var(--mui-palette-customColors-trackBg)' },
        dataLabels: {
          name: { show: true },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '1.25rem',
            color: 'var(--mui-palette-text-secondary)'
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 700,
        options: {
          grid: {
            padding: {
              left: 20,
              right: 20
            }
          }
        }
      }
    ]
  }

  return <AppReactApexCharts type='radialBar' height={212} width='100%' options={options} series={series} />
}

export default DashboardRadialBarChart
