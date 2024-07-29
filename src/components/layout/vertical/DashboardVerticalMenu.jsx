// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import generateOptions, { getRandomInt } from '../../dialogs/create-app/GenerateQuizSelectedOptions'
import generateDates from '../../dialogs/create-app/GenerateDates'
import teamsru from '@/app/../components/../views/dashboards/dashboard/src/screens/DashboardBuilder/Teams'
import { createQuiz, createSelectedAnswersCurrentQuiz } from '@/app/server/actions'
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
          {dictionary['navigation'].analytics}
        </MenuItem>
        <MenuItem
          target='_blank'
          icon={<i className='ri-star-smile-line' />}
          onClick={async () => {
            console.log('onclick menuitem')

            var countGenerated = 20
            var maximum = 10
            var generatedOptions = generateOptions(countGenerated, maximum)
            let optionsStr = generatedOptions.join(',')

            var teamId = getRandomInt(Reflect.ownKeys(teamsru).length - 1)

            if (!checkValidJoinedStr(optionsStr, countGenerated, 1, maximum, 0)) {
              console.log('generated quiz is not valid! not sending to db')
            } else {
              let c = await createSelectedAnswersCurrentQuiz(optionsStr, teamId)

              console.log('options   ' + c)
            }
          }}
        >
          {dictionary['navigation'].ideas}
        </MenuItem>
        <MenuItem
          icon={<i className='ri-wechat-line' />}
          onClick={async () => {
            //var randomDayNum = 6 + getRandomInt(15) //[7,21]

            //console.log(' randomDayNum  ' + randomDayNum)

            //const dates = generateDates(new Date(2024, 6, randomDayNum), new Date(2023, 6, randomDayNum + 7), 1)
            //const date = dates[0]
            const dateNow = new Date()

            //const date = dateNow.getDate()

            console.log(dateNow)

            var formatted = format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, dateNow)
            var quizTypeId = '1'
            var auditory = '300'
            let c = await createQuiz(formatted, quizTypeId, auditory)

            console.log('create quiz result ' + c)
          }}
        >
          {dictionary['navigation'].commentaries}
        </MenuItem>
        <MenuItem href={`/${locale}/pages/dialog-examples`} icon={<i className='ri-calendar-line' />}>
          {dictionary['navigation'].quizes}
        </MenuItem>
        <MenuItem href={`${process.env.NEXT_PUBLIC_DOCS_URL}`} target='_blank' icon={<i className='ri-team-line' />}>
          {dictionary['navigation'].teams}
        </MenuItem>
      </Menu>
    </ScrollWrapper>
  )
}

export default DashboardVerticalMenu
