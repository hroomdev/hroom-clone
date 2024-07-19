/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

'use client'

import React from 'react'

import PropTypes from 'prop-types'

import { Arrowdropupfilled2 } from '../../icons/Arrowdropupfilled2'
import './style.css'

export const TotalRevenue = ({
  className,
  chartClassName,
  hasListSubheader = true,
  activitiyGaugeClassName,
  ringMiddle = '/img/ring-middle.svg'
}) => {
  return (
    <div className={`total-revenue ${className}`}>
      <div className='title'>
        <div className='sub-text'>Вовлечённость</div>
      </div>
      <div className='chart'>
        <div className={`chart-2 ${chartClassName}`}>
          {hasListSubheader && <img className='list-subheader-2' alt='List subheader' src='/img/listsubheader.svg' />}

          <div className={`activitiy-gauge ${activitiyGaugeClassName}`}>
            <div className='overlap-group'>
              <div className='comment'>
                <div className='text-wrapper-4'>высокая</div>
                <div className='frame'>
                  <div className='name'>на 1.3</div>
                  <Arrowdropupfilled2 className='arrow-drop-up-filled' color='#4CAF50' />
                  <div className='name-2'>выше рынка</div>
                </div>
              </div>
              <div className='change'>
                <div className='title-2'>2.2</div>
                <Arrowdropupfilled2 className='arrow-drop-up-filled' color='#4CAF50' />
              </div>
              <div className='title-3'>7.2</div>
              <img className='ring-middle' alt='Ring middle' src={ringMiddle} />
            </div>
          </div>
        </div>
      </div>
      <div className='data'>
        <div className='bars'>
          <div className='bar' />
          <div className='bar-2' />
          <div className='bar-3' />
          <div className='bar-4' />
        </div>
        <div className='frame-2'>
          <p className='p'>
            <span className='span'>22%</span>
            <span className='text-wrapper-5'> Вовлечённые</span>
          </p>
          <p className='name-3'>
            <span className='span'>25%</span>
            <span className='text-wrapper-5'> Слабо вовлечённые</span>
          </p>
          <p className='name-3'>
            <span className='span'>21%</span>
            <span className='text-wrapper-5'> Невовлечённые</span>
          </p>
          <p className='name-3'>
            <span className='span'>32%</span>
            <span className='text-wrapper-5'> Пропустили</span>
          </p>
        </div>
      </div>
    </div>
  )
}

TotalRevenue.propTypes = {
  hasListSubheader: PropTypes.bool,
  ringMiddle: PropTypes.string
}
