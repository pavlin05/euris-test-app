import React from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const TextInput: React.FC<TextInputProps> = React.forwardRef(
  (
    { className, ...props }: TextInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      />
    )
  },
)

export default TextInput
