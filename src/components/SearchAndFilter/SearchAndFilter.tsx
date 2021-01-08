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

const SearchAndFilter: React.FC<filterProps> = ({allData, columns, filterTypes}) => {
  const [selectedFilters, dispatch] = useReducer(reduceSelectedFilters, {})
  const [filteredDataResults, setFilteredDataResults] = useState<Array<object>>([])
  const [searchField, setSearchField] = useState<string>('')
  const [searchedDataResults, setSearchedDataResults] = useState<Array<string>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const makeFilterControlledState = useCallback(() => {
    if(filterTypes) {
      filterTypes.forEach(filterName => {
        try {
          if (allData.every(piece => Object.keys(piece).includes(filterName))) {
            dispatch({type: filterName})
          } else {
            throw `Some or all of the data is missing the key "${filterName}"`
          }
        } catch (e) {
          console.error(e)
        }
      })
    }
  }, [allData, filterTypes])

  const createFilterOptions = (filterType: string) => {
    const availableOptions = determineAvailableFilterValues(filterType)

    const options = availableOptions.map((option, i) => {
        if (availableOptions.indexOf(option) === i) {
          return <option value={option.toString()}>{option}</option>
        }
      })

    return (
      <>
      <label htmlFor={`${filterType}-selector`}>{filterType}</label>
      <select 
        id={`${filterType}-selector`} 
        onChange={(event) => {
          searchData()
          filterData()
          dispatch({type: filterType, value: event.target.value})
        }}
        value={selectedFilters[filterType]}
      >
        <option value="">All</option>
        {options}
      </select>
      </>
    )
  }

  const filterData = useCallback(() => {
    let result:object[] = filteredDataResults.length > 0 ? filteredDataResults : allData

    const someFilterIsSelected = ():boolean => {
      return Object.values(selectedFilters).some(filter => filter !== 'All')
    }
    
    if (filterTypes && someFilterIsSelected()) {
      filterTypes.forEach(filter => {
        if (selectedFilters[filter] !== 'All') {
          result = result.filter((item:stringKeyOptions) => item[filter].includes(selectedFilters[filter]))
        } 
      })
    }
    setFilteredDataResults(result)
  }, [allData, filterTypes, filteredDataResults, selectedFilters])

  const cleanDataForSearch = (item: object):any[] => {
    Object.values(item).reduce((values, value) => {
      if (Array.isArray(value)) {
        return values.concat(value)
      } else {
        return value.push(value)
      }
    }, [])
  }

  const searchData = () => {
    let result:any[] = [];
    
    if (searchField !== '') {
      result = allData.map(item => {
        let itemsValues:any[] = cleanDataForSearch(item)
        itemsValues = itemsValues.map(value => `${value}`.toUpperCase())

        if (itemsValues.some(value => value.includes(searchField.toUpperCase()))) return item.id
        }
      )}

    setFilteredDataResults(result)
  } 

  const determineAvailableFilterValues = (filterType: string) => {
    const allOptions = allData.reduce((options:(string | number | boolean)[], item:stringKeyOptions): (string | number | boolean)[] => {
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

  const findFiltersWithoutResults = ():boolean => {
    const someFiltersArentDefault = () => {
      return Object.keys(selectedFilters)
        .some(filter => selectedFilters[filter] !== 'All')
    }

   if (someFiltersArentDefault() && filteredDataResults.length === 0) {
     return true
   } else {
     return false
   }
  }

  const determineListItems = () => {
    if (filteredDataResults.length > 0) {
      return <List listItems={filteredDataResults} columns={columns}/>
    } else if (findFiltersWithoutResults()) {
      return (
        <> 
          <h3>We couldn't find any matching results</h3>
          <List listItems={allData} columns={columns}/>
        </>
      )
    } else {
      return <List listItems={allData} columns={columns}/>
    }
  }

  const clearFilters = () => {
    if(filterTypes) {
      filterTypes.forEach(filter => dispatch({type: filter}))
    }
  }

  useEffect(() => {
    makeFilterControlledState()
    setIsLoading(false)
  }, [allData, filterTypes, isLoading, makeFilterControlledState])

  // useEffect(() => {

  // }, [filteredDataResults])

  return (
    <div>
      <form 
        onSubmit={(event) => {
          event.preventDefault()
          filterData()
          searchData()
        }
      }>
        <input 
          id='search-box' 
          type="textbox" 
          placeholder="search" 
          onChange={(event) => {
            setSearchField(event.target.value)
            }}
          />
        <button type="submit">search</button>
        <button 
          type="reset" 
          onClick={() => {
            setSearchField('')
            filterData()
          }}
        >
          clear
        </button>
      </form>
      {filterTypes &&
        <>
          {filterTypes.map(filter => createFilterOptions(filter))}
          <button onClick={clearFilters}>Reset</button>
        </>
      }
      {determineListItems()}
    </div>
  )
}

export default SearchAndFilter