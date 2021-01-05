import React from 'react'

import SearchAndFilter from '../SearchAndFilter/SearchAndFilter.tsx'

import './RestaurantList.css'

const RestaurantList: React.FC = () => {
  console.log('called')
  return (
    <>
      <div>Hello List</div>
      <SearchAndFilter>
      </SearchAndFilter>
    </>
  )
}

export default RestaurantList