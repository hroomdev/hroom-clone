//MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Components Imports
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'

// Vars
const data = [
  {
    stats: '5.1',
    title: 'Удовлетворенность',
    color: 'warning-opacity-light',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '12.5',
    title: 'Лояльность',
    color: 'success-opacity-light',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '6.3',
    color: 'error-opacity-light',
    title: 'Счастье',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    color: 'error-opacity-light',
    title: 'Отношения с руководителем',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    color: 'success-opacity-light',
    title: 'Самочувствие',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    color: 'success-opacity-light',
    title: 'Отношения с коллегами',
    icon: '/static/img/icon-38.svg',
    icon2: '/static/img/vector.svg',
    diff: '0.4'
  },
  {
    stats: '7.7',
    color: 'warning-opacity-light',
    title: 'Личностный рост',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    color: 'warning-opacity-light',
    title: 'Согласованность',
    icon: '/static/img/icon-41.svg',
    icon2: '/static/img/vector.svg',
    diff: '1'
  },
  {
    stats: '7.7',
    color: 'error-opacity-light',
    title: 'Признание',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  },
  {
    stats: '7.7',
    color: 'error-opacity-light',
    title: 'Обратная связь',
    icon: '/static/img/icon-42.svg',
    icon2: '/static/img/vector.svg',
    diff: '1.2'
  }
]

const DashboardTransactions = () => {
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
                      <Typography variant='h5'>{item.stats}</Typography>
                    </Grid>
                    <Grid item xs='auto'>
                      <img className='vector' alt='Vector' src={item.icon2} />
                    </Grid>
                    <Grid item xs='auto'>
                      <div className='percentage'>{item.diff}</div>
                    </Grid>
                    <Grid item xs={12}>
                      {' '}
                      <Typography>{item.title}</Typography>
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
