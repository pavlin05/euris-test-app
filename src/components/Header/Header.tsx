import React from 'react'
import { MoonIcon, SunIcon } from '../Ui/Icons/Icons.tsx'
import useTheme from '../../hooks/useTheme.tsx'
import Button from '../Ui/Button'

const Header: React.FC = () => {
  const { theme, darkModeHandler } = useTheme()
  return (
    <header>
      <nav className="bg-white border border-gray-300 p-5 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
              Euris Test
            </span>
          </div>
          <div>
            <Button
              className={
                'bg-transparent border border-gray-300 hover:bg-transparent hover:opacity-60 dark:border-gray-700'
              }
              onClick={darkModeHandler}
            >
              {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
