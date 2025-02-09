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
    <Modal title="Elimina prodotto" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>Sei sicuro di voler eliminare il prodotto {product.title}?</div>
        <div className="flex justify-end">
          <Button onClick={handleDeleteProduct}>
            {isLoading && <SpinnerIcon />} Invia
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDeleteProduct
