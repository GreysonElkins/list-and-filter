// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'

import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import { restaurant }from './definitions'
import { getRestaurants } from './apiFunctions'
import fakeData from './FakeData'

import './App.scss';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<restaurant[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
      // getRestaurants()
      //   .then(restaurants => {
      //     if (Array.isArray(restaurants)) {
      //       setRestaurants(restaurants)
      //     } else {
      //       setError(restaurants)
      //     }
      //   })
      //   .then(() => {
      //     setIsLoading(false)
      // })
      setRestaurants(fakeData)
      setIsLoading(false)
  }, [isLoading])

  return (
    <div className="App">
      <header><h1>Restaurant Locator</h1></header>
      <main> 
        <SearchAndFilter 
          allData={restaurants} 
          columns={['name', 'city', 'state', 'telephone', 'genre', 'website']}
          filterTypes={['state', 'genre']}
        />
        {isLoading &&
          <img src="/loading.gif" alt="loading icon" />
        }
      </main>
    </div>
  );
}

export default App;
