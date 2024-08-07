/** @type { import('@storybook/react').Preview } */

import '../src/app/globals.css'
import '@fontsource/material-icons'
import '../src/assets/iconify-icons/generated-icons.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
