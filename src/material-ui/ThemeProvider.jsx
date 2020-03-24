import React, {createContext, useState} from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export const ThemeContext = createContext();
export default (props) => {
  const [themePaletteType, setThemePaletteType] = useState('light')
  const theme = createMuiTheme({
      palette: {
        primary: {
          main: '#880e4f'
        },
        secondary: {
          main: '#2196f3'
        },
        type: themePaletteType
      }
    })
  const toggleTheme = () => {
    setThemePaletteType(themePaletteType === 'dark' ? 'light' : 'dark')
  }
  console.log({themePaletteType})
  return (
    <ThemeContext.Provider value={{toggleTheme}}>
      <MuiThemeProvider theme={theme}>
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}