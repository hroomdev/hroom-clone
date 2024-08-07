'use client'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import './../../../../app/globals.css'

//Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
//styling

//sb imports
import PropTypes from 'prop-types'

const Card = styled(MuiCard)(({ bbcolor }) => ({
  transition: 'border 0.3s ease-in-out, box-shadow 0.3s ease-in-out, margin 0.3s ease-in-out',
  borderBottomWidth: '2px',
  borderBottomColor: `var(--mui-palette-` + bbcolor + `-main)`,
  '[data-skin="bordered"] &:hover': {
    boxShadow: 'none'
  },
  '&:hover': {
    borderBottomWidth: '3px',
    borderBottomColor: 'var(--mui-palette-' + bbcolor + '-main)',
    boxShadow: 'var(--mui-customShadows-xl)',
    marginBlockEnd: '-1px'
  }
}))

const MyChip = styled(Chip)(({}) => ({
  fontWeight: 500
}))

const DashboardCard = props => {
  // Props
  const { title, borderColor, avatarIcon, ritoric, chipLabel } = props
  //          <Typography variant='h4'>{stats}</Typography>

  return (
    <Card bbcolor={borderColor || 'primary'}>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          <CustomAvatar color={'primary'} skin='light' variant='rounded'>
            <i className={avatarIcon} />
          </CustomAvatar>
        </div>
        <div className='flex flex-col justify-center'>
          <Typography color='text.primary'>{title}</Typography>
          <div className='flex items-center gap-2'>
            <MyChip variant='tonal' label={chipLabel} size='small' />
            <Typography variant='body2' color='text.disabled'>
              {ritoric}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardCard

DashboardCard.propTypes = {
  /**
   * Текст основной самой подсказки
   */
  title: PropTypes.string.isRequired,
  /**
   * Иконка название remix icon https://remixicon.com/ с префиксом ri- так же список доступен в файле src\assets\iconify-icons\generated-icons.css
   */
  avatarIcon: PropTypes.string.isRequired,
  /**
   * Текст - подсазка
   */
  ritoric: PropTypes.string.isRequired,
  /**
   * Текст - название подсказки
   */
  chipLabel: PropTypes.string.isRequired,
  /**
   * Цвет - обводки карточки снизу
   */
  borderColor: PropTypes.string.isRequired
}

DashboardCard.defaultProps = {
  title: 'Найдите слабые метрики команд и ознакомьтесь с советами помощника.',
  avatarIcon: 'ri-car-line',
  ritoric: 'Что делать дальше',
  chipLabel: 'рекомендация',
  borderColor: 'primary'
}
