/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

'use client'

import React from 'react'

import PropTypes from 'prop-types'

import { Icon13 } from '../../icons/Icon13'
import './style.css'

export const Transactions = ({
  className,
  frameClassName,
  bodyClassName,
  icon = '/img/icon-36.svg',
  img = '/img/icon-37.svg',
  icon1 = '/img/icon-36.svg',
  icon2 = '/img/icon-37.svg',
  bodyClassNameOverride,
  text = 'Обратная связь',
  icon3 = '/img/icon-37.svg',
  icon4 = '/img/icon-36.svg',
  icon5 = '/img/icon-37.svg',
  text1 = 'Лояльность'
}) => {
  return (
    <div className={`transactions ${className}`}>
      <div className={`frame-3 ${frameClassName}`}>
        <div className={`body ${bodyClassName}`}>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={icon} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>5.1</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1</div>
                </div>
                <div className='name-5'>Удовлетворённость</div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={img} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>7.7</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1.2</div>
                </div>
                <div className='name-6'>Счастье</div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src='/img/icon-38.svg' />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>6.3</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>0.4</div>
                </div>
                <div className='name-6'>Самочувствие</div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={icon1} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>5.1</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1</div>
                </div>
                <div className='name-6'>Личностный рост</div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={icon2} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>7.7</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1.2</div>
                </div>
                <div className='name-6'>Признание</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`body ${bodyClassNameOverride}`}>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src='/img/icon-38.svg' />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>6.3</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>0.4</div>
                </div>
                <div className='name-6'>{text}</div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={icon3} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>7.7</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1.2</div>
                </div>
                <div className='name-7'>
                  Отношения
                  <br />с руководителем
                </div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src='/img/icon-38.svg' />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>6.3</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>0.4</div>
                </div>
                <div className='name-8'>
                  Отношения
                  <br />с коллегами
                </div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={icon4} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>5.1</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1</div>
                </div>
                <div className='name-6'>Согласованность</div>
              </div>
            </div>
          </div>
          <div className='list'>
            <div className='name-4'>
              <img className='icon' alt='Icon' src={icon5} />
              <div className='text'>
                <div className='stats'>
                  <div className='element'>7.7</div>
                  <Icon13 className='icon-13' color='#56CA00' />
                  <div className='percentage'>1.2</div>
                </div>
                <div className='name-6'>{text1}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Transactions.propTypes = {
  icon: PropTypes.string,
  img: PropTypes.string,
  icon1: PropTypes.string,
  icon2: PropTypes.string,
  text: PropTypes.string,
  icon3: PropTypes.string,
  icon4: PropTypes.string,
  icon5: PropTypes.string,
  text1: PropTypes.string
}
