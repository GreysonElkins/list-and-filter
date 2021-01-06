import React, { useEffect, useState } from 'react'


import { listProps } from './definitions'
import { stringKeyOptions } from '../SearchAndFilter/definitions'
// import './RestaurantList.css'

const List: React.FC<listProps> = ({ listItems, columns }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)

  useEffect(() => {
    setPageNumber(1)
  }, [listItems])

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

  const makeListPageNavigation = () => {
    return (
      <nav>
        <button 
            disabled={pageNumber > 1 ? false : true}
            onClick={() => setPageNumber(pageNumber - 1)}
            >
            previous
          </button>
            {pageNumber}
          <button
            disabled={paginateList(pageNumber + 1).length === 0 ? true : false}
            onClick={() => setPageNumber(pageNumber + 1)}
            >
            next
          </button>
          <br />
          showing 10 out of {listItems.length} restaurants
      </nav>
    )
  }

  const paginateList = (page = pageNumber): object[] => {
    const listRange = [(page - 1) * 10, page * 10 - 1]
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
      {makeListPageNavigation()}
    </>
  )
}

export default List