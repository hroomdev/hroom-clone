/*
We're constantly improving the code you see.
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/
'use client'

import React from 'react'

import PropTypes from 'prop-types'

import { Icon10 } from '../../icons/Icon10'
import { RemixIconsLineBuildingsHomeSmileLine2 } from '../../icons/RemixIconsLineBuildingsHomeSmileLine2'
import { RemixIconsLineBuildingsHomeSmileLine4 } from '../../icons/RemixIconsLineBuildingsHomeSmileLine4'
import { RemixIconsLineBusinessBarChart2Line1 } from '../../icons/RemixIconsLineBusinessBarChart2Line1'
import { RemixIconsLineBusinessBarChartBoxLine1 } from '../../icons/RemixIconsLineBusinessBarChartBoxLine1'
import { RemixIconsLineBusinessBarChartBoxLine4 } from '../../icons/RemixIconsLineBusinessBarChartBoxLine4'
import { RemixIconsLineBusinessCalendarLine2 } from '../../icons/RemixIconsLineBusinessCalendarLine2'
import { RemixIconsLineBusinessCalendarLine3 } from '../../icons/RemixIconsLineBusinessCalendarLine3'
import { RemixIconsLineBusinessMailOpenLine } from '../../icons/RemixIconsLineBusinessMailOpenLine'
import { RemixIconsLineDesignDragDropLine } from '../../icons/RemixIconsLineDesignDragDropLine'
import { RemixIconsLineDesignLayout4Line } from '../../icons/RemixIconsLineDesignLayout4Line'
import { RemixIconsLineDesignLayoutLeftLine } from '../../icons/RemixIconsLineDesignLayoutLeftLine'
import { RemixIconsLineDesignTableAltLine } from '../../icons/RemixIconsLineDesignTableAltLine'
import { RemixIconsLineDevelopmentGitCommitLine } from '../../icons/RemixIconsLineDevelopmentGitCommitLine'
import { RemixIconsLineDeviceTv2Line } from '../../icons/RemixIconsLineDeviceTv2Line'
import { RemixIconsLineDocumentBillLine } from '../../icons/RemixIconsLineDocumentBillLine'
import { RemixIconsLineEditorTable2 } from '../../icons/RemixIconsLineEditorTable2'
import { RemixIconsLineEditorText } from '../../icons/RemixIconsLineEditorText'
import { RemixIconsLineFinanceShoppingBag3Line } from '../../icons/RemixIconsLineFinanceShoppingBag3Line'
import { RemixIconsLineLogosRemixiconLine } from '../../icons/RemixIconsLineLogosRemixiconLine'
import { RemixIconsLineLogosWechatLine1 } from '../../icons/RemixIconsLineLogosWechatLine1'
import { RemixIconsLineMapCarLine5 } from '../../icons/RemixIconsLineMapCarLine5'
import { RemixIconsLineOthersGraduationCapLine } from '../../icons/RemixIconsLineOthersGraduationCapLine'
import { RemixIconsLineSystemCheckboxMultipleLine } from '../../icons/RemixIconsLineSystemCheckboxMultipleLine'
import { RemixIconsLineSystemLock2Line } from '../../icons/RemixIconsLineSystemLock2Line'
import { RemixIconsLineSystemMoreLine } from '../../icons/RemixIconsLineSystemMoreLine'
import { RemixIconsLineSystemRadioButtonLine } from '../../icons/RemixIconsLineSystemRadioButtonLine'
import { RemixIconsLineSystemShieldKeyholeLine } from '../../icons/RemixIconsLineSystemShieldKeyholeLine'
import { RemixIconsLineSystemToggleLine } from '../../icons/RemixIconsLineSystemToggleLine'
import { RemixIconsLineUserStarSmileLine } from '../../icons/RemixIconsLineUserStarSmileLine'
import { RemixIconsLineUserTeamLine } from '../../icons/RemixIconsLineUserTeamLine'
import { RemixIconsLineUserUserLine } from '../../icons/RemixIconsLineUserUserLine'
import { RemixIconsLineUserUserLine5 } from '../../icons/RemixIconsLineUserUserLine5'
import './style.css'
import './styleguide.css'

export const Menu = ({
  menu,
  className,
  logoClassName,
  menuDrawerClassName,
  icon = <RemixIconsLineBusinessBarChartBoxLine1 className='remix-icons-line' color='#E7E3FC' />,
  override = <RemixIconsLineBusinessCalendarLine2 className='remix-icons-line' color='#E7E3FC' />
}) => {
  return (
    <div className={`menu ${menu} ${className}`} data-variables-mode={menu === 'semi-dark' ? 'dark' : undefined}>
      {['border-menu-drawer', 'menu-collapsed-drawer'].includes(menu) && (
        <div className='div'>
          {menu === 'menu-collapsed-drawer' && (
            <>
              <img className='logo' alt='Logo' src='/img/logo.svg' />
              <div className='menu-drawer-2'>
                <div className='dashboard'>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineBuildingsHomeSmileLine2 className='instance-node' color='#2E263D' />
                    </div>
                  </div>
                </div>
                <div className='section-separator'>
                  <div className='list-subheader'>
                    <img className='line' alt='Line' src='/img/line-1.svg' />
                  </div>
                </div>
                <div className='div-2'>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineFinanceShoppingBag3Line className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineOthersGraduationCapLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineMapCarLine5 className='instance-node' color='#2E263D' opacity='0.9' />
                    </div>
                  </div>
                  <div className='container-wrapper'>
                    <div className='container'>
                      <RemixIconsLineUserUserLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineBusinessMailOpenLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineLogosWechatLine1 className='instance-node' color='#2E263D' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineBusinessCalendarLine3 className='instance-node' color='#2E263D' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDesignDragDropLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDocumentBillLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDesignDragDropLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineSystemLock2Line className='instance-node' />
                    </div>
                  </div>
                </div>
                <div className='section-separator'>
                  <div className='list-subheader'>
                    <img className='line' alt='Line' src='/img/line-1.svg' />
                  </div>
                </div>
                <div className='div-2'>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDesignLayoutLeftLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineSystemShieldKeyholeLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDevelopmentGitCommitLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDeviceTv2Line className='instance-node' />
                    </div>
                  </div>
                </div>
                <div className='section-separator'>
                  <div className='list-subheader'>
                    <img className='line' alt='Line' src='/img/line-1.svg' />
                  </div>
                </div>
                <div className='div-2'>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineEditorText className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineLogosRemixiconLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineBusinessBarChartBoxLine4 className='instance-node' color='#2E263D' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineSystemToggleLine className='instance-node' />
                    </div>
                  </div>
                </div>
                <div className='section-separator'>
                  <div className='list-subheader'>
                    <img className='line' alt='Line' src='/img/line-1.svg' />
                  </div>
                </div>
                <div className='div-2'>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineSystemRadioButtonLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDesignLayout4Line className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineSystemCheckboxMultipleLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDevelopmentGitCommitLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineDesignTableAltLine className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineEditorTable2 className='instance-node' />
                    </div>
                  </div>
                </div>
                <div className='section-separator'>
                  <div className='list-subheader'>
                    <img className='line' alt='Line' src='/img/line-1.svg' />
                  </div>
                </div>
                <div className='div-2'>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineBusinessBarChart2Line1 className='instance-node' />
                    </div>
                  </div>
                  <div className='list-item'>
                    <div className='container'>
                      <RemixIconsLineSystemMoreLine className='instance-node' />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {menu === 'border-menu-drawer' && (
            <>
              <div className='logo-2'>
                <img className='img' alt='Logo' src='/img/logo-1.png' />
                <div className='HROOM'>MATERIO</div>
              </div>
              <div className='menu-drawer-3'>
                <div className='list-item-wrapper'>
                  <div className='list-item-2'>
                    <RemixIconsLineBuildingsHomeSmileLine4 className='remix-icons-line' />
                    <div className='div-3'>Дашборд</div>
                  </div>
                </div>
                <div className='div-4'>
                  <div className='list-item-3'>
                    <RemixIconsLineBusinessBarChartBoxLine4 className='remix-icons-line' color='#2E263D' />
                    <div className='div-3'>Аналитика</div>
                  </div>
                  <div className='list-item-3'>
                    <RemixIconsLineUserStarSmileLine className='remix-icons-line' color='#2E263D' />
                    <div className='div-3'>Идеи</div>
                  </div>
                  <div className='list-item-3'>
                    <RemixIconsLineLogosWechatLine1 className='remix-icons-line' color='#2E263D' />
                    <div className='text-wrapper'>Комментарии</div>
                  </div>
                  <div className='list-item-3'>
                    <RemixIconsLineBusinessCalendarLine3 className='remix-icons-line' color='#2E263D' />
                    <div className='text-wrapper'>Опросы</div>
                  </div>
                  <div className='list-item-3'>
                    <RemixIconsLineUserUserLine className='remix-icons-line' />
                    <div className='div-3'>Users</div>
                  </div>
                  <div className='list-item-3'>
                    <RemixIconsLineDocumentBillLine className='remix-icons-line' />
                    <div className='text-wrapper'>Invoice</div>
                  </div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineBusinessBarChart2Line1 className='remix-icons-line' />
                  <div className='div-3'>Charts</div>
                  <Icon10 className='remix-icons-line' />
                </div>
                <div className='div-4'>
                  <div className='list-item-3'>
                    <RemixIconsLineDesignLayout4Line className='remix-icons-line' />
                    <div className='div-3'>Form Layout</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {['menu-drawer', 'semi-dark'].includes(menu) && (
        <>
          <div className='logo-3'>
            {menu === 'menu-drawer' && (
              <>
                <img className={`img ${logoClassName}`} alt='Logo' src='/img/logo-1.png' />
                <div className='text-wrapper-2'>HROOM</div>
              </>
            )}

            {menu === 'semi-dark' && (
              <>
                <div className={`logo-4 ${logoClassName}`} />
                <div className='text-wrapper-3'>HROOM</div>
              </>
            )}
          </div>
          <div className={`menu-drawer-4 ${menuDrawerClassName}`}>
            <div className='div-wrapper'>
              <div className='list-item-4'>
                <RemixIconsLineBuildingsHomeSmileLine2
                  className='remix-icons-line'
                  color={menu === 'menu-drawer' ? '#2E263D' : '#E7E3FC'}
                />
                <div className='div-3'>Дашборд</div>
              </div>
            </div>
            {menu === 'menu-drawer' && (
              <div className='div-5'>
                <div className='list-item-3'>
                  <RemixIconsLineBusinessBarChartBoxLine1 className='remix-icons-line' color='#2E263D' />
                  <div className='div-3'>Аналитика</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineUserStarSmileLine className='remix-icons-line' color='#2E263D' />
                  <div className='div-3'>Идеи</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineLogosWechatLine1 className='remix-icons-line' color='#2E263D' />
                  <div className='text-wrapper'>Комментарии</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineBusinessCalendarLine2 className='remix-icons-line' color='#2E263D' />
                  <div className='text-wrapper'>Опросы</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineUserUserLine className='remix-icons-line' />
                  <div className='div-3'>Users</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineDocumentBillLine className='remix-icons-line' />
                  <div className='text-wrapper'>Invoice</div>
                </div>
              </div>
            )}

            <div className='list-item-3'>
              {menu === 'semi-dark' && <>{icon}</>}

              {menu === 'menu-drawer' && <RemixIconsLineBusinessBarChart2Line1 className='remix-icons-line' />}

              <div className='div-3'>
                {menu === 'semi-dark' && <>Аналитика</>}

                {menu === 'menu-drawer' && <>Charts</>}
              </div>
              {menu === 'menu-drawer' && <Icon10 className='remix-icons-line' />}
            </div>
            {menu === 'menu-drawer' && (
              <div className='div-5'>
                <div className='list-item-3'>
                  <RemixIconsLineDesignLayout4Line className='remix-icons-line' />
                  <div className='div-3'>Form Layout</div>
                </div>
              </div>
            )}

            {menu === 'semi-dark' && (
              <>
                <div className='list-item-3'>
                  <RemixIconsLineUserStarSmileLine className='remix-icons-line' color='#E7E3FC' />
                  <div className='div-3'>Идеи</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineLogosWechatLine1 className='remix-icons-line' color='#E7E3FC' />
                  <div className='text-wrapper'>Комментарии</div>
                </div>
                <div className='list-item-3'>
                  {override}
                  <div className='text-wrapper'>Опросы</div>
                </div>
                <div className='list-item-3'>
                  <RemixIconsLineUserTeamLine className='remix-icons-line' />
                  <div className='text-wrapper'>Команды</div>
                </div>
                <div className='section-separator-2' />
                <div className='list-item-3'>
                  <RemixIconsLineUserUserLine5 className='remix-icons-line' />
                  <div className='div-3'>Профиль</div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

Menu.propTypes = {
  menu: PropTypes.oneOf(['menu-drawer', 'semi-dark', 'menu-collapsed-drawer', 'border-menu-drawer'])
}
