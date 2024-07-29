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

import { binaryFormat, midRangeRating, ratingMax } from './../../../../app/server/const'

const DashboardRadialBarChart = ({ stats }) => {
  const radialBarColors = {
    series1: '#56ca00'
  }

  //series2: 'rgba(255, 195, 51, 1)',
  //series3: 'rgba(239, 83, 80, 1)',
  //series4: 'rgba(138, 141, 147, 0.38)'

  var series = [Math.round(stats[5]) * ratingMax]

  //Math.round(stats[2].toString(binaryFormat)),
  //Math.round(stats[3].toString(binaryFormat)),
  //Math.round(stats[4].toString(binaryFormat))

  const options = {
    labels: [''], //, Вовлеченные 'Слабо вовлеченные', 'Невовлеченные', 'Пропустили'
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
      lineCap: 'round',
      curve: 'straight'
    },
    colors: [radialBarColors.series1], //, radialBarColors.series2, radialBarColors.series3, radialBarColors.series4
    plotOptions: {
      radialBar: {
        endAngle: 115,
        startAngle: -115,
        hollow: { size: '60%' },
        track: { background: 'var(--mui-palette-customColors-trackBg)' },
        dataLabels: {
          name: { show: true },
          formatter: function (val, opt) {
            return val.toString().substring(0, val.toString().length - 1)
          },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '0.0rem',
            color: 'var(--mui-palette-text-secondary)'
          },
          total: {
            show: true,
            label: Math.round(stats[5]).toFixed(0),
            fontSize: '2.25rem',
            padding: 40
          },
          position: 'bottom'
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#52B98E'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
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

  //<img
  //      src='/static/img/ellipse-1603.svg'
  //      style={{
  //        position: 'absolute',
  //        zIndex: '1',
  //        paddingRight: '0.0rem',
  //        paddingTop: '1.8rem',
  //        width: '100%',
  //        height: 122
  //      }}
  //    />

  return (
    <>
      <AppReactApexCharts
        type='radialBar'
        height={242}
        width='100%'
        options={options}
        series={series}
        style={{ position: 'relative', zIndex: '2' }}
      />
    </>
  )
}

export default DashboardRadialBarChart
