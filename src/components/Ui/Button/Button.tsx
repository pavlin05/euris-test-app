import React from 'react'

interface ButtonProps extends React.ComponentProps<'button'> {
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`flex flex-row gap-1 items-center text-white bg-blue-600 hover:opacity-60 rounded-lg p-2.5 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
