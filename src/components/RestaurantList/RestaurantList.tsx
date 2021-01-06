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
  const [pageNumber, setPageNumber] = useState<number>(1)

  useEffect(() => {
       if(isLoading) {

        // still need to sort restaurants, should be called in this block

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

  const makeRestaurantTable = () => {
    const restaurantsToDisplay = paginateRestaurantList()

    const listItems = restaurantsToDisplay.map(({ name, city, state, telephone, genre, website }) => {
      return (
        <tr>
          <td>{name}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{telephone}</td>
          <td>{genre}</td>
          <td>
            <a href={website} alt={`${name}'s website`}>
              🌐
            </a>
          </td>
        </tr>
      )
    })

    return (
      <>
        <table>
          <thead>
            <td>Restaurant</td>
            <td>City</td>
            <td>State</td>
            <td>Phone Number</td>
            <td>Genres</td>
          </thead>
          {listItems}
        </table>
        <button 
          disabled={pageNumber > 1 ? false : true}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          previous
        </button>
          {pageNumber}
        <button
          // disabled={}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          next
        </button>
      </>
    )
  }

  const paginateRestaurantList = () => {
    const listRange = [(pageNumber - 1) * 10, pageNumber * 10 - 1]
    let listItems = []
    
    for (let i = listRange[0]; i < listRange[1]; i++) {
      listItems.push(restaurantList[i])
    }

    return listItems
  }

  return (
    <>
      <div>{error}</div>
      <SearchAndFilter>
      </SearchAndFilter>
      {restaurantList.length > 0 && makeRestaurantTable()}
    </>
  )
}

export default RestaurantList