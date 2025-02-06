import React from 'react'

const Header: React.FC = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 p-5 dark:bg-gray-800">
        <div className="">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="text-xl font-bold dark:text-white">
              Euris Test
            </span>
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
