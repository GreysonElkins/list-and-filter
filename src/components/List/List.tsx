import React, { useEffect, useState } from 'react'


import { listProps } from './definitions'
import { stringKeyOptions } from '../SearchAndFilter/definitions'
// import './RestaurantList.css'

const List: React.FC<listProps> = ({ listItems, columns }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)

  const makeTableColumns = () => {
    const htmlColumns = columns.map(column => <td>{column}</td>)
    return (
      <thead>
        {htmlColumns}
      </thead>
    )
  }

  const makeDataRows = () => {
    const pageOfItems = paginateList()
    return pageOfItems.reduce((rows: React.ReactNode[], item:stringKeyOptions): React.ReactNode[] => {
      const row = columns.map(column => (
        <td>{
          Array.isArray(item[column]) ? item[column].join(',') : item[column] 
        }</td>
      ))
      rows = rows.concat(<tr>{row}</tr>)
      return rows
    }, [])
  }

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
  //         {listItems}
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

  const paginateList = (): object[] => {
    const listRange = [(pageNumber - 1) * 10, pageNumber * 10 - 1]
    let pageOfItems = []
    
    for (let i = listRange[0]; i <= listRange[1]; i++) {
      if (listItems[i]) pageOfItems.push(listItems[i])
    }

    return pageOfItems
  }

  return (
    <>
    <table>
      {makeTableColumns()}
      {makeDataRows()}
    </table>
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