import { fn } from '@storybook/test'
import DashboardCard from './DashboardCard'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'

import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const themeext = extendTheme({
  colorSchemes: { light: true, dark: true },
  cssVarPrefix: 'mui'
})

//themeext.vars.palette.primary.main = 'red'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Dashboard/Card',
  component: DashboardCard,
  decorators: [
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading the theme value from parameters
      return (
        <CssVarsProvider theme={themeext}>
          <Story />
        </CssVarsProvider>
      )
    }
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    borderColor: { control: 'select', options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'] }
  }
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //args: { onClick: fn() }
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AdviceStats = {
  args: {
    title: 'Текст совета ',
    avatarIcon: 'ri-car-line',
    ritoric: 'Что делать дальше',
    chipLabel: 'рекомендация'
  }
}
