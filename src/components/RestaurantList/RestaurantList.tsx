import React, { useEffect, useState } from 'react'

import SearchAndFilter from '../SearchAndFilter/SearchAndFilter.tsx'
import { restaurant }from './definitions'
import { getRestaurants } from './apiFunctions.tsx'
import fakeData from './FakeData.tsx'

import './RestaurantList.css'

const RestaurantList: React.FC = () => {
  const [restaurantList, setRestaurantList] = useState<restaurant[]>([]) 
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
       if(isLoading) {
        // getRestaurants()
        //   .then(restaurants => {
        //     if (Array.isArray(restaurants)) {
        //       setRestaurantList(restaurants)
        //     } else {
        //       setError(restaurants)
        //     }
        //   })
        //   .then(() => {
        //     setIsLoading(false)
        // })

        setRestaurantList(fakeData)
        setIsLoading(false)

       }
  })

  return (
    <>
      <div>Hello List</div>
      <div>{error}</div>
      <SearchAndFilter>
      </SearchAndFilter>
    </>
  )
}

export default RestaurantList