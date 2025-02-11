import React, { useState } from 'react'
import { Product } from '../../../features/product/query.ts'
import { useAppSelector } from '../../../hooks/useRedux.ts'
import { viewLayoutSelector } from '../../../features/ui/selector.ts'
import Button from '../../../components/Ui/Button'
import { TrashBinIcon } from '../../../components/Ui/Icons/Icons.tsx'
import ModalDeleteProduct from './ModalDeleteProduct.tsx'

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const viewLayout = useAppSelector(viewLayoutSelector)

  return (
    <div className="p-5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <div
        className={`flex gap-5 ${viewLayout === 'grid' ? 'flex-col' : 'flex-col md:flex-row md:justify-between'}`}
      >
        <div>
          <h2 className="font-bold text-2xl">{product.title}</h2>
          <p className="text-lg">{product.description}</p>
          <p className="text-lg">{product.price}€</p>
        </div>
        <div
          className={`flex ${viewLayout === 'grid' ? 'flex-col' : 'flex-col md:gap-5 md:flex-row'}`}
        >
          <p className="font-bold text-lg">
            Category:{' '}
            <span className="font-normal text-sm">{product.category}</span>
          </p>
          <p className="font-bold text-lg">
            Employee:{' '}
            <span className="font-normal text-sm">{product.employee}</span>
          </p>
          <div>
            <h4 className="font-bold text-lg">Reviews:</h4>
            <ul className="list-disc list-inside text-sm">
              {product.reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="bg-red-600" onClick={() => setIsOpen(true)}>
            <TrashBinIcon className="text-white" />
            Delete
          </Button>
        </div>
      </div>
      <ModalDeleteProduct
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
      />
    </div>
  )
}

export default CardProduct
