/* eslint-disable no-throw-literal */
import React, { useReducer, useState, useEffect, useCallback } from 'react'

import List from '../List/List'
import { filterProps, filterUpdate, stringKeyOptions } from './definitions'

import './SearchAndFilter.css'

const changeSelectedFilters = (state: object, filterUpdate:filterUpdate) => {
  return {
    ...state,
    [filterUpdate.type]: filterUpdate.value || 'All'
  }
}

const SearchAndFilter: React.FC<filterProps> = ({allData, columns, filterTypes}) => {
  const [selectedFilterValues, dispatchFilters] = useReducer(changeSelectedFilters, {})
  const [foundFilterIds, setFoundFilterIds] = useState<Array<string> | undefined>(undefined)
  const [searchTextBox, setSearchTextBox] = useState<string>('')
  const [foundSearchIds, setFoundSearchIds] = useState<Array<string> | undefined>(undefined)
  const [queriedListItems, setQueriedListItems] = useState<Array<object>>([])
  const [userMessage, setUserMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const saveFilterTypes = useCallback(() => {
    if(filterTypes) {
      filterTypes.forEach(filterName => {
        try {
          if (allData.every(piece => Object.keys(piece).includes(filterName))) {
            dispatchFilters({type: filterName})
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

    const options = availableOptions.reduce((options:React.ReactNode[], option, i) => {
        if (availableOptions.indexOf(option) === i) {
          options.push(<option value={option.toString()}>{option}</option>)
        }
        return options
      }, [])

    return (
      <>
      <label htmlFor={`${filterType}-selector`}>{filterType}</label>
      <select 
        id={`${filterType}-selector`} 
        onChange={(event) => {
          dispatchFilters({type: filterType, value: event.target.value})
        }}
        value={selectedFilterValues[filterType]}
      >
        <option value="">All</option>
        {options}
      </select>
      </>
    )
  }

  const determineAvailableFilterValues = (filterType: string) => {
    const allOptions = allData
      .reduce((options:(string | number | boolean)[], option:stringKeyOptions): (string | number | boolean)[] => {
        try {
          if (Array.isArray(option[filterType])) {
            options = options.concat(option[filterType])
          } else if (typeof option[filterType] === 'object') {
            throw `Some of the filter options for ${filterType} were ignored because the data was too complex`
          } else {
            options.push(option[filterType])
          }
        } catch (e) {
          console.error(e)
        }
        return options
      }, [])
    return allOptions.sort()
  }

  const someFiltersAreSelected = useCallback(():boolean => {
    return Object.values(selectedFilterValues).some(filter => filter !== 'All')
  }, [selectedFilterValues])
  
  const filterData = useCallback(() => {
    let result:Array<{id:string}> = []
    
    if (filterTypes && someFiltersAreSelected()) {
      filterTypes.forEach(filter => {
        if (selectedFilterValues[filter] !== 'All') {
          const dataToSearch = result.length > 0 ? result : allData
          result = dataToSearch.filter((item:stringKeyOptions) => {
            return item[filter].includes(selectedFilterValues[filter])
          })
        } 
      })
    } else {
      setFoundFilterIds(undefined)
    }

    const resultIds = result.map(item => item.id)
    setFoundFilterIds(resultIds)
  }, [allData, someFiltersAreSelected, filterTypes, selectedFilterValues])


  const makeDataSearchFriendly = (item: object):string[] => {
    const oneGroupOfValues = Object.values(item).reduce((values:any[], value) => {
      try {
        if (Array.isArray(value)) {
          values.concat(value)
        } else if (typeof(value) === 'object') {
          throw `Some of the search results were ignored because the data was too complex`
        } else {
          values.push(value)
        }
      } catch (e) {
        console.log(e)
      }
      return values
    }, [])

    return oneGroupOfValues.map(value => value.toUpperCase())
  }

  const searchData = () => {
    let result:any[] = [];

    if (searchTextBox !== '') {
      result = allData.reduce((results:string[], item) => {
        let itemsValues:string[] = makeDataSearchFriendly(item)
        if (itemsValues.some(value => value.includes(searchTextBox.toUpperCase()))) {
          results.push(item.id)
        }
        return results
      }, [])
    }

    setFoundSearchIds(result)
  } 

  const messageIfSearchFailed = useCallback(() => {
    const noResults = 'We were unable to find anything based on your search, please try again'
    if (someFiltersAreSelected() && queriedListItems.length === 0) {
      setUserMessage(noResults) 
    } else if (foundSearchIds && queriedListItems.length === 0) {
      setUserMessage(noResults) 
    } else {
      setUserMessage('')
    }
  }, [queriedListItems.length, foundSearchIds, someFiltersAreSelected])

  const determineListItems = () => {
    if (queriedListItems.length > 0) {
      return <List listItems={queriedListItems} columns={columns}/>
    } else {
      return (<>
      <h3>{userMessage}</h3>
      <List listItems={allData} columns={columns}/>
      </>)
    }
  }

  const resetFilters = () => {
    if(filterTypes) {
      filterTypes.forEach(filter => dispatchFilters({type: filter}))
    }
  }

  const compareSearchAndFilterResults = useCallback(() => {
    let matchingResults: object[] = []
    if (foundSearchIds && foundFilterIds) {
      matchingResults = allData.filter(item => {
        return foundSearchIds.includes(item.id) && foundFilterIds.includes(item.id)
      }) 
    } else if (foundSearchIds) {
      matchingResults = allData.filter(item => foundSearchIds.includes(item.id))
    } else if (foundFilterIds) {
      matchingResults = allData.filter(item => foundFilterIds.includes(item.id))
    }
    setQueriedListItems(matchingResults)

  }, [allData, foundFilterIds, foundSearchIds])

  useEffect(() => {
    saveFilterTypes()
    setIsLoading(false)
  }, [allData, filterTypes, isLoading, saveFilterTypes])

  useEffect(() => {
    compareSearchAndFilterResults()
    messageIfSearchFailed()
  }, [compareSearchAndFilterResults, foundSearchIds, foundFilterIds, messageIfSearchFailed])

  useEffect(() => {
    filterData()
  }, [filterData, selectedFilterValues])

    useEffect(() => {
    if (searchTextBox === '') setFoundSearchIds(undefined)
  }, [searchTextBox])

  useEffect(() => {
    if (!someFiltersAreSelected()) setFoundFilterIds(undefined)
  }, [someFiltersAreSelected])

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
            setSearchTextBox(event.target.value)
            }}
          />
        <button 
          type="submit"
          disabled={searchTextBox==='' ? true : false}
          >search</button>
        <button 
          type="reset" 
          onClick={() => {
            setSearchTextBox('')
          }}
        >
          clear
        </button>
      </form>
      {filterTypes &&
        <>
          {filterTypes.map(filter => createFilterOptions(filter))}
          <button onClick={resetFilters}>Reset</button>
        </>
      }
      {determineListItems()}
    </div>
  )
}

export default SearchAndFilter