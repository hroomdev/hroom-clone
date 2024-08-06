// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Chip from '@mui/material/Chip'

import { useTheme } from '@mui/material/styles'

// Third-party Imports
//dictionary['navigation'].analytics
///*dictionary['navigation'].ideas*/
//* dictionary['navigation'].commentaries*/
//dictionary['navigation'].quizes
//dictionary['navigation'].teams

import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

import {
  dbQuizAuditoryIdx,
  dbQuizIdIdx,
  dbQuizTimeStartSIdx,
  dbQuizTypeIdx,
  dbSelectedAnswersIdIdx
} from '@/app/server/dbMapping'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import generateOptions, { getRandomInt } from '../../dialogs/create-app/GenerateQuizSelectedOptions'
import generateDates from '../../dialogs/create-app/GenerateDates'
import teamsru from '@/app/../components/../views/dashboards/dashboard/src/screens/DashboardBuilder/Teams'
import employeeId, {
  employeesru
} from '@/app/../components/../views/dashboards/dashboard/src/screens/DashboardBuilder/Employees'

import { getStatsMetrics } from '@/app/server/statistics'

import {
  getSelectedAnswersByOrderDescQuizId,
  getCurrentQuiz,
  getQuizOrderByIdDesc,
  getQuestGroupTypeBy,
  getSelectedOptions,
  getQuestGroupGroupBy,
  getQuestionMetricSubMetricQuestionBy,
  createQuiz,
  createSelectedAnswersCurrentQuiz,
  createStatistics,
  getEmployees
} from '@/app/server/actions'

import { generateSelectedOptions, generateStatistics, generateQuiz } from '@/app/server/dashboardstrategy'

import { checkValidJoinedStr } from './../../../../src/components/dialogs/create-app/TestSelectedOptionsValidity'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

var format = require('date-format')

const DashboardVerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}

      /*style={{ visibility: 'hidden' }}*/ //home-smile-line bar-chart-box-line star-smile-line wechat-line calendar-line team-line
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href={`/${locale}/dashboards/dashboard`} icon={<i className='ri-home-smile-line' />}>
          {dictionary['navigation'].dashboard}
        </MenuItem>
        <MenuItem
          href={`${process.env.NEXT_PUBLIC_DOCS_URL}/docs/user-interface/components`}
          target='_blank'
          icon={<i className='ri-bar-chart-box-line' />}
        >
          {'                    '}
        </MenuItem>
        <MenuItem
          target='_blank'
          icon={<i className='ri-star-smile-line' />}
          onClick={async () => {
            await generateSelectedOptions() //generate 1 quiz 1 employee last statistic
            await generateStatistics(1, 1) //статистику только по последнему опросу только по последнему ответу
          }}
        >
          {'заполнить опрос'}
        </MenuItem>
        <MenuItem
          icon={<i className='ri-wechat-line' />}
          onClick={async () => {
            console.log('create quiz before ener')
            await generateQuiz()
            console.log('create quiz after exit')
          }}
        >
          {'создать опрос'}
        </MenuItem>
        <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='ri-calendar-line' />}>
          {'пройти самому опрос'}
        </MenuItem>
        <MenuItem
          href={`${process.env.NEXT_PUBLIC_DOCS_URL}`}
          target='_blank'
          icon={<i className='ri-team-line' />}
          onClick={async () => {
            await generateStatistics(12, 100) //статистику
          }}
        >
          {'генерировать статистику'}
        </MenuItem>
      </Menu>
    </ScrollWrapper>
  )
}

export default DashboardVerticalMenu
