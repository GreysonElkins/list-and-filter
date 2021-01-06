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
  }, [isLoading])

  const makeRestaurantTable = (page:number) => {
    const restaurantsToDisplay:restaurant[] = paginateRestaurantList(page)

    const listItems = restaurantsToDisplay.map(({ name, city, state, telephone, genre, website }) => {
      return (
        <tr>
          <td>{name}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{telephone}</td>
          <td>{genre}</td>
          <td>
            <a href={website} title={`${name}'s website`}>
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
        {makePageNavigation()}
      </>
    )
  }

  const makePageNavigation = () => {
    return (
      <nav>
        showing 10 out of {restaurantList.length} restaurants 
        <button 
            disabled={pageNumber > 1 ? false : true}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            previous
          </button>
            {pageNumber}
          <button
            disabled={paginateRestaurantList(pageNumber + 1).length === 0 ? true : false}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            next
          </button>
      </nav>
    )
  }

  const paginateRestaurantList = (page:number): restaurant[] => {
    const listRange = [(page - 1) * 10, page * 10 - 1]
    let listItems = []
    
    for (let i = listRange[0]; i < listRange[1]; i++) {
      if (restaurantList[i]) listItems.push(restaurantList[i])
    }

    return listItems
  }

  return (
    <>
      <div>{error}</div>
      {restaurantList.length > 0 && makeRestaurantTable(pageNumber)}
    </>
  )
}

export default RestaurantList