import React from 'react'
import { PolarArea } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useGetStatsQuery } from '../../../features/stats/query.ts'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const GraphCategoryProduct: React.FC = () => {
  const { data: stats = [] } = useGetStatsQuery()

  const statsData = {
    labels: stats.map((p) => p.category),
    datasets: [
      {
        data: stats.map((p) => p.numberOfProducts),
        label: 'Number of products',
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9966FF',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div
      className={'flex justify-center max-h-140 w-full'}
      data-testid="graph-category-product"
    >
      <PolarArea data={statsData} />
    </div>
  )
}

export default GraphCategoryProduct
