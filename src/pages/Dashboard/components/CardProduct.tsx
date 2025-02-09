import React from 'react'
import {
  Product,
  useDeleteProductMutation,
} from '../../../features/product/query.ts'
import { useAppSelector } from '../../../hooks/useRedux.ts'
import { viewLayoutSelector } from '../../../features/ui/selector.ts'
import Button from '../../../components/Ui/Button'
import { TrashBinIcon } from '../../../components/Ui/Icons/Icons.tsx'

const CardProduct: React.FC<{ product: Product }> = ({ product }) => {
  const [deleteProduct] = useDeleteProductMutation()
  const viewLayout = useAppSelector(viewLayoutSelector)

  const handleDeleteProduct = async () => {
    await deleteProduct(product.id!)
  }

  return (
    <div className="p-5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700">
      <div
        className={`flex gap-5 ${viewLayout === 'grid' ? 'flex-col' : 'flex-col md:flex-row md:justify-between'}`}
      >
        <div>
          <h2 className="font-bold text-4xl">{product.title}</h2>
          <p className="text-lg">{product.description}</p>
          <p className="text-lg">{product.price}€</p>
        </div>
        <div
          className={`flex ${viewLayout === 'grid' ? 'flex-col' : 'flex-col md:gap-5 md:flex-row'}`}
        >
          <p className="font-bold text-lg">
            Categoria:{' '}
            <span className="font-normal text-sm">{product.category}</span>
          </p>
          <p className="font-bold text-lg">
            Dipendente:{' '}
            <span className="font-normal text-sm">{product.employee}</span>
          </p>
          <div>
            <h4 className="font-bold text-lg">Recensioni:</h4>
            <ul className="list-disc list-inside text-sm">
              {product.reviews.map((review, index) => (
                <li key={index}>{review}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="bg-red-600" onClick={handleDeleteProduct}>
            <TrashBinIcon className="text-white" />
            Elimina
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct
