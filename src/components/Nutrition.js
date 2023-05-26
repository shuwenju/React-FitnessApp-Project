import React, { useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import { Link } from 'react-router-dom'

import NutritionAnalysis from './NutritionAnalysis'

const Nutrition = ({
  usertdee,
  foodLog,
  setFoodLog,
  carbs,
  setCarbs,
  protein,
  setProtein,
  fat,
  setFat,
  caloriesLeft,
  setCaloriesLeft,
  changeCaloriesLeft,
  changeFoodLog,
}) => {
  const [foodInput, setFoodInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // const [caloriesLeft, setCaloriesLeft] = useState(usertdee)

  const handleButtonClick = async () => {
    if (foodInput.trim() === '') {
      // console.log(usertdee)
      return
    }

    const query = encodeURIComponent(foodInput)

    setIsLoading(true)

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
        {
          method: 'GET',
          headers: {
            'X-Api-Key': 'IsAHlqi1pgFJ9XLPdu/O9w==Ue6nrtSq6H5uSKh9',
            'Content-Type': 'application/json',
          },
        }
      )

      const result = await response.json()
      changeFoodLog([...foodLog, result[0]])
      if (foodLog.length === 0) {
        setCaloriesLeft(
          (caloriesLeft - parseFloat(result[0].calories)).toFixed(2)
        )
        console.log('cal left:' + caloriesLeft)
      } else {
        changeCaloriesLeft()
      }

      setFat((prevFat) =>
        (parseFloat(prevFat) + parseFloat(result[0].fat_total_g)).toFixed(2)
      )
      setProtein((prevProtein) =>
        (parseFloat(prevProtein) + parseFloat(result[0].protein_g)).toFixed(2)
      )
      setCarbs((prevCarbs) =>
        (
          parseFloat(prevCarbs) + parseFloat(result[0].carbohydrates_total_g)
        ).toFixed(2)
      )

      setIsLoading(false)
    } catch (error) {
      console.error('Error: ', error)
      setIsLoading(false)
    }
    setFoodInput('')
  }

  const handleInputChange = (event) => {
    setFoodInput(event.target.value)
  }

  useEffect(() => {
    console.log(foodLog)
  }, [usertdee])

  return (
    <div>
      <div className='absolute left-5 top-1/2 transform -translate-y-1/2'>
        <Link to='/goals' className='inline-block'>
          <button className='bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center'>
            {/* Alternative left arrow */}
            <svg
              className='h-6 w-6 text-white transform rotate-180'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className='container mx-auto'>
        <div className='sm:col-span-4 flex flex-col'>
          <div className='mb-2'>
            <label
              htmlFor='food'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Add food to calculate your calorie intake today:
            </label>
          </div>
          <div className='relative flex-grow'>
            <input
              id='food'
              name='food'
              type='text'
              value={foodInput}
              onChange={handleInputChange}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <button
              className='absolute right-0 top-0 bottom-0 px-3 py-1.5 bg-blue-500 text-white rounded-r-md'
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Add'}
            </button>
          </div>
          <p className='mt-3 text-sm leading-6 text-gray-600'>
            Example: 1lb brisket. Default quantity is 100g if you don't specify
          </p>
        </div>
        <div>
          <div className='space-x-4'>
            {foodLog.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </div>
        </div>

        <div>
          <NutritionAnalysis
            caloriesLeft={caloriesLeft}
            fat={fat}
            protein={protein}
            carbs={carbs}
          />
        </div>
      </div>

      <div className='absolute right-5 top-1/2 transform -translate-y-1/2'>
        <Link to='/workouts' className='inline-block'>
          <button className='bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center'>
            {/* Alternative right arrow */}
            <svg
              className='h-6 w-6 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Nutrition
