//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

//styles
//import styles from './DashboardTransactions.module.css'
//import './DashboardTransactions.css'

import './components/Transactions/style.css'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

import { metricsru } from './screens/DashboardBuilder/Metrics'
import colorsOrd, { colorsRGBA } from './MetricsColors'
import { binaryFormat, midRangeRating } from '@/app/server/const'
import { getVectorFileName, getScaleVec, getColor } from './../src/components/VectorUtils'

var styleClassPrefixTransactions = '.transactions '

// Vars
const data = [
  {
    stats: '5.1',
    title: 'Satisfaction',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '12.5',
    title: 'Ambassadorship',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '6.3',
    title: 'Happiness',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    title: 'Relationship with Manager',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    title: 'Wellness',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    title: 'Relationship with Peers',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    title: 'Personal Growth',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    title: 'Alignment',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    title: 'Recognition',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    title: 'Feedback',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  }
]

const DashboardTransactions = ({ stats, statsDiffs }) => {
  //console.log('stats len' + stats.length + 'statsdifflen' + statsDiffs.length)

  //'#8a8d9361' color grey
  //'#56ca00' color green
  //'#ef5350' color red

  //upside down transform: scaleX(-1)

  return (
    <Card className='bs-full'>
      <CardContent className='!pbs-5'>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={6} md={6} key={index}>
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' className='shadow-xs' sx={{ bgcolor: colorsRGBA[item.title] }}>
                  <img className='icon-2' alt='Icon' src={item.icon} />
                </CustomAvatar>
                <div>
                  <Grid container spacing={2} flex justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs='auto'>
                      <Typography variant='h5'>{stats[index].toFixed(1)}</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                      <img
                        className='vector'
                        alt='Vector'
                        src={getVectorFileName(
                          statsDiffs[index],
                          '/static/img/',
                          'vector.svg',
                          'vectorred.svg',
                          'vectorgrey.svg'
                        )}
                        style={{ transform: getScaleVec(statsDiffs[index]) }}
                      />
                    </Grid>
                    <Grid item xs='auto'>
                      <div className='percentage' style={{ color: getColor(statsDiffs[index]) }}>
                        {statsDiffs[index].toFixed(1)}
                      </div>
                      <div></div>
                    </Grid>
                    <Grid item xs={12}>
                      {' '}
                      <div className='name-3'>{metricsru[item.title]}</div>
                      {/*<Typography>{metricsru[item.title]}</Typography>*/}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DashboardTransactions
