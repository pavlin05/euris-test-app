import React from 'react'
import Button from '../../../components/Ui/Button'
import {
  GridIcon,
  ListIcon,
  PlusIcon,
} from '../../../components/Ui/Icons/Icons.tsx'
import { useGetStoreQuery } from '../../../features/store/query.ts'
import { setViewLayout } from '../../../features/ui/slice.ts'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux.ts'
import { viewLayoutSelector } from '../../../features/ui/selector.ts'

const HeaderProduct: React.FC<{ handleModalOpen: () => void }> = ({
  handleModalOpen,
}) => {
  const dispatch = useAppDispatch()
  const viewLayout = useAppSelector(viewLayoutSelector)
  const { data: store } = useGetStoreQuery()
  const storeName = store?.name || ''

  const handleViewLayout = () => {
    dispatch(setViewLayout(viewLayout === 'grid' ? 'panel' : 'grid'))
  }
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-gray-700 dark:text-gray-300 text-4xl font-bold">
        {storeName}
      </h1>
      <Button className={'hidden md:block'} onClick={handleViewLayout}>
        {viewLayout === 'grid' ? (
          <ListIcon className={'text-white'} />
        ) : (
          <GridIcon className={'text-white'} />
        )}
      </Button>
      <Button onClick={handleModalOpen}>
        <PlusIcon className={'text-white'} />
        Add new product
      </Button>
    </div>
  )
}

export default HeaderProduct
