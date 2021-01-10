// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'

import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import { restaurant }from './definitions'
import { getRestaurants } from './apiFunctions'
import fakeData from './FakeData'
import loadingIcon from '../../loading.gif'

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
      //       setIsLoading(false)
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
        {error &&
          <div className="error-message">{error}</div>
        }
      <main> 
        {isLoading &&
        <div className="loading-icon-container">
          <img className="loading-icon" src={loadingIcon} alt="loading icon" />
        </div>
        }
        <SearchAndFilter 
          allData={restaurants} 
          columns={['name', 'city', 'state', 'telephone', 'genre', 'website']}
          filterTypes={['state', 'genre']}
          loadingIcon={loadingIcon}
          />
      </main>
    </div>
  );
}

export default App;
