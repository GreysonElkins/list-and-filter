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
  const [searchField, setSearchField] = useState<string>('')
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
          return <option value={option.toString()}>{option}</option>
        }
      })

    return (
      <>
      <label htmlFor={`${filter}-selector`}>{filter}</label>
      <select 
        id={`${filter}-selector`} 
        onChange={(event) => dispatch({type: filter, value: event.target.value})}
      >
        <option value="">All</option>
        {options}
      </select>
      </>
    )
  }

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input id='search-box' type="textbox" placeholder="search" onChange={(event) => {setSearchField(event.target.value)}}/>
        <button type="submit">search</button>
        <button type="reset" onClick={() => setSearchField('')}>clear</button>
      </form>
      {filterTypes &&
        filterTypes.map(filter => createFilterOptions(filter))
      }
    </div>
  )
}

export default SearchAndFilter