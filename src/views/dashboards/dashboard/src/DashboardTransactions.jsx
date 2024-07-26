//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

import { metricsru } from './screens/DashboardBuilder/Metrics'

// Vars
const data = [
  {
    stats: '5.1',
    title: 'Satisfaction',
    color: 'warning-opacity-light',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '12.5',
    title: 'Ambassadorship',
    color: 'success-opacity-light',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '6.3',
    color: 'error-opacity-light',
    title: 'Happiness',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    color: 'error-opacity-light',
    title: 'Relationship with Manager',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    color: 'success-opacity-light',
    title: 'Wellness',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    color: 'success-opacity-light',
    title: 'Relationship with Peers',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    color: 'warning-opacity-light',
    title: 'Personal Growth',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    color: 'warning-opacity-light',
    title: 'Alignment',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    color: 'error-opacity-light',
    title: 'Recognition',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    color: 'error-opacity-light',
    title: 'Feedback',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  }
]

const DashboardTransactions = ({ stats, statsDiffs }) => {
  //console.log('stats len' + stats.length + 'statsdifflen' + statsDiffs.length)

  return (
    <Card className='bs-full'>
      <CardContent className='!pbs-5'>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={6} md={6} key={index}>
              <div className='flex items-center gap-3'>
                <CustomAvatar variant='rounded' color={item.color} className='shadow-xs'>
                  <img className='icon-2' alt='Icon' src={item.icon} />
                </CustomAvatar>
                <div>
                  <Grid container spacing={2} flex justifyContent='flex-start' alignItems='flex-start'>
                    <Grid item xs='auto'>
                      <Typography variant='h5'>{stats[index]}</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                      <img className='vector' alt='Vector' src={item.icon2} />
                    </Grid>
                    <Grid item xs='auto'>
                      <div className='percentage' style={{ color: '#56ca00' }}>
                        {statsDiffs[index]}
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      {' '}
                      <Typography>{metricsru[item.title]}</Typography>
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
