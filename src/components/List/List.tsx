import React, { useEffect, useState } from 'react'

import './RestaurantList.css'

const List: React.FC = () => {
  // const [restaurantList, setRestaurantList] = useState<restaurant[]>([])   
  // const [pageNumber, setPageNumber] = useState<number>(1)


  // const makeRestaurantTable = (page:number) => {
  //   const restaurantsToDisplay:restaurant[] = paginateRestaurantList(page)

  //   const listItems = restaurantsToDisplay.map(({ name, city, state, telephone, genre, website }) => {
  //     return (
  //       <tr>
  //         <td>{name}</td>
  //         <td>{city}</td>
  //         <td>{state}</td>
  //         <td>{telephone}</td>
  //         <td>{genre.join(', ')}</td>
  //         <td>
  //           <a href={website} title={`${name}'s website`}>
  //             🌐
  //           </a>
  //         </td>
  //       </tr>
  //     )
  //   })

  //   return (
  //     <>
  //       <table>
  //         <thead>
  //           <td>Restaurant</td>
  //           <td>City</td>
  //           <td>State</td>
  //           <td>Phone Number</td>
  //           <td>Genres</td>
  //         </thead>
  //         {listItems}
  //       </table>
  //       {makePageNavigation()}
  //     </>
  //   )
  // }

  // const makePageNavigation = () => {
  //   return (
  //     <nav>
  //       <button 
  //           disabled={pageNumber > 1 ? false : true}
  //           onClick={() => setPageNumber(pageNumber - 1)}
  //           >
  //           previous
  //         </button>
  //           {pageNumber}
  //         <button
  //           disabled={paginateRestaurantList(pageNumber + 1).length === 0 ? true : false}
  //           onClick={() => setPageNumber(pageNumber + 1)}
  //           >
  //           next
  //         </button>
  //         <br />
  //         showing 10 out of {restaurantList.length} restaurants
  //     </nav>
  //   )
  // }

  // const paginateRestaurantList = (page:number): restaurant[] => {
  //   const listRange = [(page - 1) * 10, page * 10 - 1]
  //   let listItems = []
    
  //   for (let i = listRange[0]; i < listRange[1]; i++) {
  //     if (restaurantList[i]) listItems.push(restaurantList[i])
  //   }

  //   return listItems
  // }

  return (
    <>
    Hello List
      {/* <div>{error}</div>
      {restaurantList.length > 0 && 
        <>
          {makeRestaurantTable(pageNumber)}
          <SearchAndFilter>
          </SearchAndFilter>
        </>
      } */}
    </>
  )
}

export default List