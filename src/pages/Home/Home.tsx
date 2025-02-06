import React from 'react'
import { useGetProductsQuery } from '../../features/product/query.ts'
import { useGetStoreQuery } from '../../features/store/query.ts'

const Home: React.FC = () => {
  const { data: products } = useGetProductsQuery()
  const { data: store } = useGetStoreQuery()
  console.log(products)
  console.log(store)
  return <div>Home</div>
}

export default Home
