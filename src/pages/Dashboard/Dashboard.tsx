import React, { useState } from 'react'
import { useGetProductsQuery } from '../../features/product/query.ts'
import { viewLayoutSelector } from '../../features/ui/selector.ts'
import { useAppSelector } from '../../hooks/useRedux.ts'
import CardProduct from './components/CardProduct.tsx'
import ModalProduct from './components/ModalProduct.tsx'
import HeaderProduct from './components/HeaderProduct.tsx'
import GraphCategoryProduct from './components/GraphCategoryProduct.tsx'

const Dashboard: React.FC = () => {
  const viewLayout = useAppSelector(viewLayoutSelector)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: products = [] } = useGetProductsQuery()

  return (
    <div className="flex flex-col gap-10">
      <HeaderProduct handleModalOpen={() => setIsModalOpen(true)} />
      <div
        data-testid={'products-layout'}
        className={
          viewLayout === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
            : 'flex flex-col gap-5'
        }
      >
        {products.map((product) => (
          <React.Fragment key={`product-${product.id}`}>
            <CardProduct product={product} />
          </React.Fragment>
        ))}
      </div>
      <GraphCategoryProduct />
      <ModalProduct
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard
