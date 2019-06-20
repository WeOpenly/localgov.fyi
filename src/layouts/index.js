import React from 'react'
import { ThemeProvider } from '@material-ui/styles'

import theme from '../theme'

import { setConfig } from 'react-hot-loader'

setConfig({
    reloadHooks: false
})

export default function TopLayout({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}