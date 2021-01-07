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
  const [selectedFilters, dispatch] = useReducer(reduceSelectedFilters, {})
  const [searchField, setSearchField] = useState<string>('')
  const [filteredData, setFilteredData] = useState<Array<object>>([])
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
  
  
  const filterData = useCallback(() => {
    let result:object[] = data

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
    setFilteredData(result)
  }, [data, filterTypes, selectedFilters])


  const searchData = () => {
    let result: object[] = filteredData.length > 0 ? filteredData : data
    if (searchField !== '') {
      result = result.filter(item => {
        let itemsValues:any[] = [].concat(...Object.values(item))
        itemsValues = itemsValues.map(value => `${value}`.toUpperCase())
        return itemsValues.some(value => value.includes(searchField.toUpperCase()))
        }
      )}
      console.log("RESULT:", result)
    setFilteredData(result)
  } 

  useEffect(() => {
    filterData()
  }, [filterData, selectedFilters])

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
        onChange={(event) => {
          searchData()
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
  
  const findFiltersWithoutResults = ():boolean => {
    const someFiltersArentDefault = () => {
      return Object.keys(selectedFilters)
        .some(filter => selectedFilters[filter] !== 'All' || selectedFilters[filter] !== '')
    }

   if (someFiltersArentDefault() && filteredData.length === 0) {
     return true
   } else {
     return false
   }
  }

  const determineListItems = () => {
    if (filteredData.length > 0) {
      return <List listItems={filteredData} columns={columns}/>
    } else if (findFiltersWithoutResults()) {
      return (
        <> 
          <h3>We couldn't find any matching results</h3>
          <List listItems={data} columns={columns}/>
        </>
      )
    } else {
      return <List listItems={data} columns={columns}/>
    }
  }

  const clearFilters = () => {
    if(filterTypes) {
      filterTypes.forEach(filter => dispatch({type: filter}))
    }
  }

  return (
    <div>
      <form 
        onSubmit={(event) => {
          event.preventDefault()
          searchData()
        }
      }>
        <input id='search-box' type="textbox" placeholder="search" onChange={(event) => {setSearchField(event.target.value)}}/>
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