'use client'

/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/
import React from 'react'

import PropTypes from 'prop-types'

import { metricsru } from './../../screens/DashboardBuilder/Metrics'
import { cohortsru } from './../../screens/DashboardBuilder/EngageCohort'

import DashboardRadialBarChart from '@/views/dashboards/dashboard/src/DashboardRadialBarChart'
import './style.css'
import { binaryFormat } from './../../../../../../app/server/const'
import { getVectorFileName, getScaleVec, getColor } from './../VectorUtils'

var percentageDiff = 0
var percentageHigh = 0
var percentageLow = 0
var percentageNot = 0
var percentageSkip = 0
var engageAbs = 8.2

export const TotalRevenue = ({
  className,
  line = '/static/img/line.svg',
  frameClassName,
  text = '86',
  icon = '/static/img/icon-40.svg',
  stats
}) => {
  percentageDiff = stats[0]
  percentageHigh = stats[1]
  percentageLow = stats[2]
  percentageNot = stats[3]
  percentageSkip = stats[4]
  engageAbs = stats[5]

  //console.log('stats.len : Total ' + stats.length)

  return (
    <div className={`total-revenue ${className}`}>
      <div className='title'>
        <div className='sub-text'>{metricsru['Engagement']}</div>
      </div>
      <div className='chart'>
        <div className='activitiy-gauge'>
          <DashboardRadialBarChart stats={stats} />
          <div className='percentage' style={{ color: getColor(percentageDiff) }}>
            {percentageDiff.toFixed(1)}%
          </div>
          <img
            className='vector'
            alt='Vector'
            src={getVectorFileName(percentageDiff, '/static/img/', 'vector.svg', 'vectorred.svg', 'vectorgrey.svg')}
            style={{ transform: getScaleVec(percentageDiff) }}
          />
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
            <span className='span'>{Math.round(stats[1].toString(binaryFormat))}%</span>
            <span className='text-wrapper-8'> {cohortsru['high']}</span>
          </p>
          <p className='p'>
            <span className='span'>{Math.round(stats[2].toString(binaryFormat))}%</span>
            <span className='text-wrapper-8'> {cohortsru['low']}</span>
          </p>
          <p className='p'>
            <span className='span'>{Math.round(stats[3].toString(binaryFormat))}%</span>
            <span className='text-wrapper-8'> {cohortsru['not']}</span>
          </p>
          <p className='p'>
            <span className='span'>{Math.round(stats[4].toString(binaryFormat))}%</span>
            <span className='text-wrapper-8'> {cohortsru['skip']}</span>
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
