import React from 'react'
import Modal from '../../../components/Ui/Modal'
import Button from '../../../components/Ui/Button'
import {
  Product,
  useDeleteProductMutation,
} from '../../../features/product/query.ts'
import { SpinnerIcon } from '../../../components/Ui/Icons/Icons.tsx'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}
const ModalDeleteProduct: React.FC<ModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

  const handleDeleteProduct = async () => {
    await deleteProduct(product.id!)
    onClose()
  }
  return (
    <Modal title="Delete product" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          Are you sure you want to delete the product? "{product.title}"?
        </div>
        <div>
          <Button onClick={handleDeleteProduct}>
            {isLoading && <SpinnerIcon />} Send
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDeleteProduct
