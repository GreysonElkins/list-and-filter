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
  const [filteredDataResults, setFilteredDataResults] = useState<Array<string>>([])
  const [searchField, setSearchField] = useState<string>('')
  const [searchedDataResults, setSearchedDataResults] = useState<Array<string>>([])
  const [limitedListItems, setLimitedListItems] = useState<Array<object>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasCompletedSearch, setHasCompletedSearch] = useState<boolean>(false)

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
          dispatch({type: filterType, value: event.target.value})
          // filterData()
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
    let result:string[] = []
    const someFilterIsSelected = ():boolean => {
      return Object.values(selectedFilters).some(filter => filter !== 'All')
    }
    
    if (filterTypes && someFilterIsSelected()) {
      filterTypes.forEach(filter => {
        if (selectedFilters[filter] !== 'All') {
          result = allData.map((item:stringKeyOptions) => {
            if (item[filter].includes(selectedFilters[filter])) return item.id
          })
        } 
      })
    }

    setFilteredDataResults(result)
    setHasCompletedSearch(true)
  }, [allData, filterTypes, selectedFilters])

  const cleanDataForSearch = (item: object):any[] => {
    return Object.values(item).reduce((values:object[], value) => {
      if (Array.isArray(value)) {
        values.concat(value)
      } else {
        values.push(value)
      }
      return values
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

    setSearchedDataResults(result)
    setHasCompletedSearch(true)
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

  const someFiltersAreNotDefault = useCallback(() => {
    return Object.keys(selectedFilters)
      .some(filter => selectedFilters[filter] !== 'All')
  }, [selectedFilters])

  const checkIfSearchFailed= ():boolean => {
   if (someFiltersAreNotDefault() && filteredDataResults.length === 0) {
     return true
   } else if (searchField !== '' && filteredDataResults.length === 0) {
     return true
   } else {
     return false
   }
  }

  const determineListItems = () => {
    if (limitedListItems.length > 0) {
      return <List listItems={limitedListItems} columns={columns}/>
    } else if (checkIfSearchFailed()) {
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

  const compareSearchAndFilterResults = useCallback(() => {
    let matchingResults: object[] = []
    if (searchField !== '' && someFiltersAreNotDefault()) {
      matchingResults = allData.filter(item => {
        return searchedDataResults.includes(item.id) && filteredDataResults.includes(item.id)
      }) 
    } else if (searchField !== '') {
      matchingResults = allData.filter(item => searchedDataResults.includes(item.id))
    } else if (someFiltersAreNotDefault()) {
      matchingResults = allData.filter(item => filteredDataResults.includes(item.id))
    }
    setLimitedListItems(matchingResults)
    
  }, [allData, filteredDataResults, searchField, searchedDataResults, someFiltersAreNotDefault])

  // is this where a render gets triggered?

  useEffect(() => {
    makeFilterControlledState()
    setIsLoading(false)
  }, [allData, filterTypes, isLoading, makeFilterControlledState])

  useEffect(() => {
    compareSearchAndFilterResults()
    setHasCompletedSearch(false)
  }, [compareSearchAndFilterResults, hasCompletedSearch])

  useEffect(() => {
    filterData()
  }, [filterData, selectedFilters])

  return (
    <div>
      <form 
        onSubmit={(event) => {
          event.preventDefault()
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