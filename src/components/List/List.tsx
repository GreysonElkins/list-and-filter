/* eslint-disable no-throw-literal */
import React, { useEffect, useState } from 'react'


import { listProps } from './definitions'
import { stringKeyOptions } from '../SearchAndFilter/definitions'
import './List.scss'

const List: React.FC<listProps> = ({ listItems, columns }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)

  useEffect(() => {
    setPageNumber(1)
  }, [listItems])

  const makeTableColumns = () => {
    const htmlColumns = columns.map((column, i) => {
      return (
        <td key={`${column}-${i}`}>
          {column}
        </td>)
    })
    return (
      <thead className="list-head">
        <tr>
        {htmlColumns}
        </tr>
      </thead>
    )
  }

  const examineCell = (cellInfo:any):string | React.ReactNode => {
    if (Array.isArray(cellInfo)) {
      return cellInfo.join(', ')
    } else if (cellInfo.includes('www.') || cellInfo.includes('http')) {
      return (
        <a href={cellInfo} title="Go to website" className="site-icon">
          <span role="link" className="site-icon">
            🌐
          </span>
        </a>)
    } else if (typeof(cellInfo) === 'object') {
      throw `This data is too complex to display: ${cellInfo}`
    } else if (cellInfo === undefined) {
      throw `Some data was undefined`
    } else {
      return cellInfo
    }
  }

  const makeDataRows = () => {
    const pageOfItems = paginateList()
    return pageOfItems.reduce((rows: React.ReactNode[], item:stringKeyOptions, i): React.ReactNode[] => {
      let cellValue:string | React.ReactNode = 'unknown'
      const row = columns.map((column, j) => {
        try {
          cellValue = examineCell(item[column])
        } catch (e) {
          console.error(e) 
        }
        return (
          <td 
            key={`cell-${j}-${i}`}
            className={j === 0 ? 'first-row-item' : 'secondary-row-item'}
          >
            {cellValue}
          </td>
        )
      })
      rows = rows.concat(<tr key={`row-${i}`}>{row}</tr>)
      return rows
    }, [])
  }

  const makeListPageNavigation = () => {
    return (
      <>
      <nav className="pages">
        <button 
            className="turn-page"
            disabled={pageNumber > 1 ? false : true}
            onClick={() => setPageNumber(pageNumber - 1)}
            title="previous page"
            >
            {'<'}
          </button>
            {pageNumber}
          <button
            className="turn-page"
            disabled={paginateList(pageNumber + 1).length === 0 ? true : false}
            onClick={() => setPageNumber(pageNumber + 1)}
            title="next page"
          >
            {'>'}
          </button>
      </nav>
          showing 10 out of {listItems.length} items
      </>
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
        <tbody>
        {makeDataRows()}
        </tbody>
      </table>
      {makeListPageNavigation()}
    </>
  )
}

export default List