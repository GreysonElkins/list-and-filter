/* eslint-disable no-throw-literal */
import React, { useReducer, useState, useEffect, useCallback } from 'react'

import List from '../List/List'
import { filterProps, filterUpdate, stringKeyOptions } from './definitions'

import './SearchAndFilter.css'

const reduceSelectedFilters = (state: object, filterUpdate:filterUpdate) => {
  return {
    ...state,
    [filterUpdate.type]: filterUpdate.value || 'All'
  }
}

const SearchAndFilter: React.FC<filterProps> = ({data, columns, filterTypes}) => {
  const [selectedFilters, dispatch] = useReducer(reduceSelectedFilters, {search: ''})
  const [limitedListSelection, setLimitedListSelection] = useState<Array<object>>([])
  const [searchField, setSearchField] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if(filterTypes) {
      filterTypes.forEach(filterName => {
        try {
          if (filterName === 'search') {
            throw "Search is not an allowed filter because it's already used."
          } else if (data.every(piece => Object.keys(piece).includes(filterName))) {
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
  
  
  const filterData = useCallback((matchingItems:object[]) => {
    let result:object[] = []
    if (filterTypes) {
      filterTypes.forEach(filter => {
        if (selectedFilters[filter] !== 'All' && filter !== 'search') {
          result = matchingItems.filter((item:stringKeyOptions) => item[filter].includes(selectedFilters[filter]))
        } 
      })
    }
    return result 
  }, [filterTypes, selectedFilters])
  
  const limitSelection = useCallback(() => {
    let matchingItems:object[] = data
    matchingItems = filterData(matchingItems)
    setLimitedListSelection(matchingItems)
  }, [data, filterData])

  useEffect(() => {
    limitSelection()
    console.log('run')
  }, [limitSelection, selectedFilters])


  const determineAvailableValues = (filterType: string) => {
    const allOptions = data.reduce((options:(string | number | boolean)[], item:stringKeyOptions): (string | number | boolean)[] => {
      try {
        if (Array.isArray(item[filterType])) {
          options = options.concat(item[filterType])
        } else if (typeof item[filterType] === 'object') {
          throw `Some of the filter options for ${filterType} were ignored because the data was too complex`
        } else {
          options.push(item[filterType])
        }
      } catch (e) {
        console.error(e)
      }
      return options
    }, [])
    return allOptions.sort()
  }

  const createFilterOptions = (filterType: string) => {
    const availableOptions = determineAvailableValues(filterType)
    const options = availableOptions.map((option, i) => {
        if(availableOptions.indexOf(option) === i) {
          return <option value={option.toString()}>{option}</option>
        }
      })

    return (
      <>
      <label htmlFor={`${filterType}-selector`}>{filterType}</label>
      <select 
        id={`${filterType}-selector`} 
        onChange={(event) => dispatch({type: filterType, value: event.target.value})}
      >
        <option value="">All</option>
        {options}
      </select>
      </>
    )
  }

  const determineListItems = () => {
    if (limitedListSelection.length > 0) {
      return <List listItems={limitedListSelection} columns={columns}/>
    } else {
      return <List listItems={data} columns={columns}/>
    }
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
      {determineListItems()}
    </div>
  )
}

export default SearchAndFilter