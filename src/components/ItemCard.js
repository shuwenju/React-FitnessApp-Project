import React from "react";

const ItemCard = ({ item }) => {
  // console.log('card' + item.name)
  return (
    <div className='bg-white shadow rounded p-4 mb-4 inline-block'>
      <h2 className='text-xl font-semibold mb-2'>{item.name}</h2>
      <p className='text-gray-700'>Calories: {item.calories}</p>
      <p className='text-gray-700'>Serving Size: {item.serving_size_g}g</p>
      <p className='text-gray-700'>Fat: {item.fat_total_g}g</p>
      <p className='text-gray-700'>Saturated Fat: {item.fat_saturated_g}g</p>
      <p className='text-gray-700'>Protein: {item.protein_g}g</p>
      <p className='text-gray-700'>
        Total Carbohydrates: {item.carbohydrates_total_g}g
      </p>
      <p className='text-gray-700'>Fiber: {item.fiber_g}g</p>
      <p className='text-gray-700'>Sugar: {item.sugar_g}g</p>
    </div>
  )
}

export default ItemCard;
