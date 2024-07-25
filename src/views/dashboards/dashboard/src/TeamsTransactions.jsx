import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports
import MenuItem from '@mui/material/MenuItem'

import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

import { metricsru } from './screens/DashboardBuilder/Metrics'
import { teamsru } from './screens/DashboardBuilder/Teams'

// Vars
const data = [
  {
    stats: '6.1',
    title: 'analytics',
    color: 'warning-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1.6'
  },
  {
    stats: '5.2',
    title: 'innersell',
    color: 'success-opacity-light',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '6.7',
    color: 'error-opacity-light',
    title: 'research',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '6.3',
    color: 'error-opacity-light',
    title: 'marketing',
    icon2: '/static/img/vector.svg',
    diff: '1.5'
  },
  {
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'backoffice',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  },
  {
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'administration',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  },
  {
    stats: '5.4',
    color: 'success-opacity-light',
    title: 'anotherteam',
    icon2: '/static/img/vector.svg',
    diff: '0.8'
  }
]

var selectedEngagementMetricKey = 'engagement'

//<Card>
//<CardContent>
//<img className='icon-2' alt='Icon' src={item.icon} />
//className='bs-full' className='!pbs-5'
//<div className='card-header'>
const TeamsTransactions = propSelectedMetric => {
  propSelectedMetric = selectedEngagementMetricKey

  const handleChange = event => {
    var key = Object.keys(metricsru).find(key => metricsru[key] === event.target.value)

    propSelectedMetric = selectedEngagementMetricKey = key
  }

  return (
    <div className='transactions-5'>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{metricsru['metric']}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={metricsru[selectedEngagementMetricKey]}
          label={metricsru[selectedEngagementMetricKey]}
          onChange={e => handleChange(e)}
        >
          <MenuItem value={metricsru['engagement']}>{metricsru['engagement']}</MenuItem>
          <MenuItem value={metricsru['satisfaction']}>{metricsru['satisfaction']}</MenuItem>
        </Select>
      </FormControl>
      <div></div>
      <div></div>
      <Grid container spacing={4} style={{ padding: '2em 0em 0em 0em' }}>
        {data.map((item, index) => (
          <Grid item xs={12} md={12} gap={4} key={index} style={{ padding: '1em 0em 0em 2.5em' }}>
            <div className='flex items-start gap-3'>
              <Grid container spacing={1} flex justifyContent='flex-start' alignItems='center'>
                <Grid item xs='auto'>
                  <div class='ellipse-3'></div>
                </Grid>
                <Grid item xs='auto'>
                  <Typography>{teamsru[item.title]}</Typography>
                </Grid>
              </Grid>
            </div>
            <div className='flex items-start gap-3'>
              <Grid
                container
                spacing={1}
                flex
                justifyContent='flex-start'
                alignItems='center'
                style={{ padding: '0em 0em 0em 1.0em' }}
              >
                <Grid item xs='auto'>
                  <Typography variant='h6'>{item.stats}</Typography>
                </Grid>
                <Grid item xs='auto'>
                  <img className='vector' alt='Vector' src={item.icon2} />
                </Grid>
                <Grid item xs='auto'>
                  <div className='percentage' style={{ color: '#56ca00' }}>
                    {item.diff}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

// <Card>
//<CardContent>
////</div>
export default TeamsTransactions
