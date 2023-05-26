import React from 'react'
import { Chart } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

const NutritionAnalysis = ({ caloriesLeft, carbs, fat, protein }) => {
  const labels = ['Carbs', 'Fat', 'Protein']
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Daily Macro',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        borderColor: 'rgb(0,0,255)',
        data: [carbs, fat, protein],
      },
    ],
  }

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold mb-6'>Your Nutrition Summary</h2>
          <p className='text-gray-500 mb-1'>
            You have {caloriesLeft} calories left for today
          </p>
          <p className='text-gray-500  mb-1'>
            Your carbs of the day is {carbs}
          </p>
          <p className='text-gray-500  mb-1'>Your fat of the day is {fat}</p>
          <p className='text-gray-500  mb-1'>
            Your protein of the day is {protein}
          </p>
        </div>
        <div className='w-64'>
          <Pie data={data} />
        </div>
      </div>
    </div>
  )
}

export default NutritionAnalysis
