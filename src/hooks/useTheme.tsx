import { useEffect, useState } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const darkModeHandler = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [theme])

  return { theme, darkModeHandler }
}

export default useTheme
