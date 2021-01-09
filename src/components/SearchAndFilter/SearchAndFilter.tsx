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
  const [selectedFilterValues, dispatch] = useReducer(reduceSelectedFilters, {})
  const [matchingFilterIds, setMatchingFilterIds] = useState<Array<string>>([])
  const [searchTextBox, setSearchTextBox] = useState<string>('')
  const [matchingSearchIds, setMatchingSearchIds] = useState<Array<string>>([])
  const [limitedListItems, setLimitedListItems] = useState<Array<object>>([])
  const [userMessage, setUserMessage] = useState<string>('')
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

  const createDomFilterOptions = (filterType: string) => {
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
          dispatch({type: filterType, value: event.target.value})
          messageIfSearchFailed()
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
      .reduce((options:(string | number | boolean)[], item:stringKeyOptions): (string | number | boolean)[] => {
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
    }

    const resultIds = result.map(item => item.id)
    setMatchingFilterIds(resultIds)
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

    setMatchingSearchIds(result)
  } 

  const someFiltersAreNotDefault = useCallback(() => {
    return Object.keys(selectedFilterValues)
      .some(filter => selectedFilterValues[filter] !== 'All')
  }, [selectedFilterValues])

  const messageIfSearchFailed = () => {
    const noResults = 'We were unable to find anything, please try again'
    if (someFiltersAreNotDefault() && limitedListItems.length === 0) {
      setUserMessage(noResults) 
    } else if (searchTextBox !== '' && limitedListItems.length === 0) {
      setUserMessage(noResults) 
    } else {
      setUserMessage('')
    }

    setTimeout(() => {
      setUserMessage('')
    }, 3000)
  }

  const determineListItems = () => {
    if (limitedListItems.length > 0) {
      return <List listItems={limitedListItems} columns={columns}/>
    } else {
      return (<>
      <h3>{userMessage}</h3>
      <List listItems={allData} columns={columns}/>
      </>)
    }
  }

  const resetFilters = () => {
    if(filterTypes) {
      filterTypes.forEach(filter => dispatch({type: filter}))
    }
  }

  const compareSearchAndFilterResults = useCallback(() => {
    let matchingResults: object[] = []
    if (searchTextBox !== '' && someFiltersAreNotDefault()) {
      matchingResults = allData.filter(item => {
        return matchingSearchIds.includes(item.id) && matchingFilterIds.includes(item.id)
      }) 
    } else if (searchTextBox !== '') {
      matchingResults = allData.filter(item => matchingSearchIds.includes(item.id))
    } else if (someFiltersAreNotDefault()) {
      matchingResults = allData.filter(item => matchingFilterIds.includes(item.id))
    }
    setLimitedListItems(matchingResults)
  }, [allData, matchingFilterIds, searchTextBox, matchingSearchIds, someFiltersAreNotDefault])

  useEffect(() => {
    makeFilterControlledState()
    setIsLoading(false)
  }, [allData, filterTypes, isLoading, makeFilterControlledState])

  useEffect(() => {
    compareSearchAndFilterResults()
  }, [compareSearchAndFilterResults, matchingSearchIds, matchingFilterIds])



  useEffect(() => {
    filterData()
  }, [filterData, selectedFilterValues])

  return (
    <div>
      <form 
        onSubmit={(event) => {
          event.preventDefault()
          searchData()
          messageIfSearchFailed()
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
        <button type="submit">search</button>
        <button 
          type="reset" 
          onClick={() => {
            setSearchTextBox('')
            setMatchingSearchIds([])
          }}
        >
          clear
        </button>
      </form>
      {filterTypes &&
        <>
          {filterTypes.map(filter => createDomFilterOptions(filter))}
          <button onClick={resetFilters}>Reset</button>
        </>
      }
      {determineListItems()}
    </div>
  )
}

export default SearchAndFilter