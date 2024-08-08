'use client'

import React, { useState, useEffect, useCallback } from 'react'

// MUI Imports
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import './../../../../app/globals.css'

//Component Imports
import PropTypes from 'prop-types'

import CustomAvatar from '@core/components/mui/Avatar'

//styling

//sb imports

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

const MyChip = styled(Chip)(({ backColor }) => ({
  fontWeight: 500,
  backgroundColor: 'var(--mui-palette-' + backColor + ')'
}))

const titleDefault = 'Найдите слабые метрики команд и ознакомьтесь с советами помощника.'

const ritoricDefault = 'Что делать дальше'
const chipLabelDefault = 'рекомендация'
const borderColorDefault = 'primary'
const chipBackgroundColorDefault = 'action-selected'

const DashboardCard = props => {
  // Props
  const [showAcatarIcon, setShowAvatarIcon] = useState(true) // Declare a state variable...

  const {
    title = titleDefault,
    avatarIcon,
    borderColor = borderColorDefault,
    ritoric = ritoricDefault,
    chipLabel = chipLabelDefault,
    chipBackgroundColor = chipBackgroundColorDefault
  } = props

  //          <Typography variant='h4'>{stats}</Typography>

  if (showAcatarIcon == true && avatarIcon == '') {
    setShowAvatarIcon(false)
  }

  return (
    <Card bbcolor={borderColor || 'primary'}>
      <CardContent className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          {showAcatarIcon == true && (
            <CustomAvatar color={'primary'} skin='light' variant='rounded'>
              <i className={avatarIcon} />
            </CustomAvatar>
          )}
        </div>
        <div className='flex flex-col justify-center'>
          <Typography color='text.primary'>{title}</Typography>
          <div className='flex items-center gap-2'>
            <MyChip
              variant='tonal'
              label={chipLabel}
              size='small'
              backColor={chipBackgroundColor || 'action-selected'}
            />
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
   * Иконка название remix icon https://icon-sets.iconify.design/ri/ с префиксом ri- так же список доступен в файле src\assets\iconify-icons\generated-icons.css
   */
  avatarIcon: PropTypes.string,

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
  borderColor: PropTypes.string.isRequired,

  /**
   * Цвет - наполнитель фишки
   */
  chipBackground: PropTypes.string.isRequired
}

DashboardCard.defaultProps = {
  title: titleDefault,
  avatarIcon: '',
  ritoric: ritoricDefault,
  chipLabel: chipLabelDefault,
  borderColor: borderColorDefault,
  chipBackgroundColor: chipBackgroundColorDefault
}
