import React from 'react'
import Button from '../Button'
import { CloseIcon } from '../Icons/Icons.tsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-50">
      <div className="p-2 md:p-5 w-full max-w-xl h-full md:h-auto">
        <div className="p-10 bg-white border-2 border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between mb-4 rounded-t items-center">
            <div className="text-gray-700 dark:text-gray-300">
              <h3 className="font-semibold ">{title}</h3>
            </div>
            <div>
              <Button className="bg-transparent" onClick={onClose}>
                <CloseIcon />
              </Button>
            </div>
          </div>
          <div className="text-gray-700 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
