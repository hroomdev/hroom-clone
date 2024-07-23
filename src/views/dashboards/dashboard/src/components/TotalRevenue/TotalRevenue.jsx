'use client'

/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from 'react'

import PropTypes from 'prop-types'

import DashboardRadialBarChart from '@/views/dashboards/dashboard/src/DashboardRadialBarChart'
import './style.css'

export const TotalRevenue = ({
  className,
  line = '/static/img/line.svg',
  frameClassName,
  text = '86%',
  icon = '/static/img/icon-40.svg'
}) => {
  return (
    <div className={`total-revenue ${className}`}>
      <div className='title'>
        <div className='sub-text'>Вовлечённость</div>
      </div>
      <div className='chart'>
        <div className='activitiy-gauge'>
          <DashboardRadialBarChart />
          <div className='percentage'>1.5%</div>
          <img className='vector' alt='Vector' src='/static/img/vector.svg' />
          <div className='overlap-group'></div>
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
          <p className='name'>
            <span className='span'>22%</span>
            <span className='text-wrapper-8'> Вовлечённые</span>
          </p>
          <p className='p'>
            <span className='span'>25%</span>
            <span className='text-wrapper-8'> Слабо вовлечённые</span>
          </p>
          <p className='p'>
            <span className='span'>21%</span>
            <span className='text-wrapper-8'> Невовлечённые</span>
          </p>
          <p className='p'>
            <span className='span'>32%</span>
            <span className='text-wrapper-8'> Пропустили</span>
          </p>
        </div>
      </div>
      <div className='frame-wrapper'>
        <div className='overlap-group-wrapper'>
          <div className='overlap-group-2'>
            <div className='badge-wrapper'>
              <div className='badge-base-wrapper'>
                <div className='badge-base'>
                  <div className='text'>Выше рынка</div>
                </div>
              </div>
            </div>
            <img className='icon' alt='Icon' src={icon} />
          </div>
        </div>
      </div>
    </div>
  )
}

TotalRevenue.propTypes = {
  line: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string
}
