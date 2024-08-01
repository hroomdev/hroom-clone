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
import tooltip from '@/@core/theme/overrides/tooltip'

const titleru = 'Сравнение с рынком'
const subtitleru = 'По командам'

// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))

//count is Category count
const updDataHeatForTeam = (seriesNameData, teamId, dataHeat, dataHeatDiff) => {
  var categoryCount = dataHeat.length //11 must be 13

  //console.log('categories ' + categoryCount)

  var statsMetricsCount = dataHeat.length //11

  var statsTeamsCount = dataHeat[0].length // 7 and 13 not more than 13

  let i = 0 //metric Id
  const series = []

  //dataHeat i'th is metric id
  //dataHeat j'th is teamId

  while (i < categoryCount) {
    var metricKey = Object.keys(metricsru).at(i)
    var metricName = metricsru[metricKey]

    const x = metricName //`w${(i + 1).toString()}`
    const y = dataHeat[i][teamId].toFixed(1)

    //dataHeatDiff[i][teamId].toFixed(1).
    var diff = dataHeatDiff[i][teamId]

    //console.log('diff ' + diff)
    var description = diff > 0 ? '+' + diff.toFixed(1) : diff.toFixed(1)

    series.push({
      x,
      y,
      description
    })
    i += 1
  }

  var teamKey = Object.keys(teamsru).at(teamId)
  var teamName = teamsru[teamKey]

  var nameData = {
    name: teamName,
    data: series
  }

  seriesNameData.push(nameData)
}

// Vars
var series = []

const DashboardHeatmapChart = ({ teamsMetricStats, teamsMetricDiffStats }) => {
  //metricss teams

  console.log('teamsMetricStats len' + teamsMetricStats.length + ' length 2nd ' + teamsMetricStats[0].length)

  console.log(JSON.stringify(teamsMetricStats))

  console.log(
    'teamsMetricDiffStats len' + teamsMetricDiffStats.length + ' length 2nd ' + teamsMetricDiffStats[0].length
  )

  series = []

  for (var i = 0; i < teamsMetricStats[0].length; i++) {
    updDataHeatForTeam(series, i, teamsMetricStats, teamsMetricDiffStats)
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
            { to: 1, from: 0, name: '0-1', color: '#DD343C' },
            { to: 2, from: 1.1, name: '1-2', color: '#DD343C' },
            { to: 3, from: 2.1, name: '2-3', color: '#DD343C' },
            { to: 4, from: 3.1, name: '3-4', color: '#8f85f3' },
            { to: 5, from: 4.1, name: '4-5', color: '#FD8F90' },
            { to: 6, from: 5.1, name: '5-6', color: '#F6E599' },
            { to: 7, from: 6.1, name: '6-7', color: '#F6E599' },
            { to: 8, from: 7.1, name: '7-8', color: '#F6E599' },
            { to: 9, from: 8.1, name: '8-9', color: '#7FC192' },
            { to: 10, from: 9.1, name: '9-10', color: '#218971' }
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
    },
    tooltip: {
      custom: function (opts) {
        const desc = opts.ctx.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].description

        const value = opts.series[opts.seriesIndex][opts.dataPointIndex]

        return desc + ': ' + value
      }
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
