/* eslint-disable no-throw-literal */
import React, { useReducer, useState, useEffect } from 'react'

import { filterProps, filterUpdate, keyOptions } from './definitions'

import './SearchAndFilter.css'

const reduceSelectedFilters = (state: object, filterUpdate:filterUpdate) => {
  return {
    ...state,
    [filterUpdate.type]: filterUpdate.value || 'All'
  }
}

const SearchAndFilter: React.FC<filterProps> = ({data, columns, filterTypes}) => {
  const [selectedFilters, dispatch] = useReducer(reduceSelectedFilters, {})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if(filterTypes) {
      filterTypes.forEach(filterName => {
        try {
          if (data.every(piece => Object.keys(piece).includes(filterName))) {
            dispatch({type: filterName})
          } else {
            throw `Some or all of the data is missing the key "${filterName}"`
          }
        } catch (e) {
          console.error(e)
        }
      })
    }
    setIsLoading(false)
  }, [data, filterTypes, isLoading])
  
  // const buildOneFilter = (filter) => {
  //   const filterMenu = data.reduce((options:Array<string | number | boolean>, item) => {
  //       try {
  //         if (Array.isArray(item[filter])) {
  //           return options.concat(item[filter])
  //         } else if (typeof item[filter] === 'object') {
  //           throw `Some of the filter options for ${filter} were ignored because the data was too complex`
  //         } else {
  //           return options.push(item[filter])
  //         }
  //       } catch (e) {
  //         console.error(e)
  //       }
  //       return options
  //     }, [<label htmlFor={`${filter}-dropdown`}>{filter}</label>])
  //   }

  // }

  const determineAvailableValues = (filter: string) => {
    const allOptions = data.reduce((options:(string | number | boolean)[], item:keyOptions): (string | number | boolean)[] => {

      try {
        if (Array.isArray(item[filter])) {
          options = options.concat(item[filter])
        } else if (typeof item[filter] === 'object') {
          throw `Some of the filter options for ${filter} were ignored because the data was too complex`
        } else {
          options.push(item[filter])
        }
      } catch (e) {
        console.error(e)
      }
      return options
    }, [])
    return allOptions.sort()
  }

  const createFilterOptions = (filter: string) => {
    const availableOptions = determineAvailableValues(filter)
    const options = availableOptions.map((option, i) => {
        if(availableOptions.indexOf(option) === i) {
          return <option>{option}</option>
        }
      })

    return (
      <>
      <label htmlFor={`${filter}-selector`}>{filter}</label>
      <select>
        <option>All</option>
        {options}
      </select>
      </>
    )
  }

  return (
    <div>
      <form>
        <input type="textbox" placeholder="search" />
        <button type="submit">search</button>
        <button>clear</button>
      </form>
      {filterTypes &&
        filterTypes.map(filter => createFilterOptions(filter))
      }
    </div>
  )
}

export default SearchAndFilter