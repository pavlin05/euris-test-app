import React from 'react'
import Modal from '../../../components/Ui/Modal'
import TextInput from '../../../components/Ui/TextInput'
import Button from '../../../components/Ui/Button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAddProductMutation } from '../../../features/product/query.ts'
import { SpinnerIcon } from '../../../components/Ui/Icons/Icons.tsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  title: string
  description: string
  price: string
  category: string
  employee: string
  reviews: string
}

const ModalProduct: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [addProduct, { isLoading }] = useAddProductMutation()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      employee: '',
      reviews: '',
    },
  })
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { title, description, price, category, employee, reviews } = data
    await addProduct({
      title,
      description,
      price: Number(price.replace(',', '.')),
      category,
      employee,
      reviews: [reviews],
    })

    reset()
    onClose()
  }

  return (
    <Modal title="Add new product" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Title"
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Description"
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
              Price
            </label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Price"
                  type="number"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
              Category
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Category"
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
              Employee
            </label>
            <Controller
              name="employee"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Employee"
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
              Review
            </label>
            <Controller
              name="reviews"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  placeholder="Review"
                  type="text"
                  required
                />
              )}
            />
          </div>
          <div>
            <Button type="submit">
              {isLoading && <SpinnerIcon />}
              Send
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default ModalProduct
