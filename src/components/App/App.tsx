// import logo from './logo.svg';
import React, { useEffect, useState } from 'react'

import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import { restaurant }from './definitions'
import { getRestaurants } from './apiFunctions'
import fakeData from './FakeData'

import './App.css';

const App: React.FC = () => {
  const [restaurants, setRestaurants] = useState<restaurant[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
      // still need to sort restaurants, should be called in this block

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
      <header>Restaurant Finder</header>
      <main> 
        <SearchAndFilter 
          data={restaurants} 
          columns={['restaurant', 'city', 'state', 'telephone', 'genre', 'website']}
          filterTypes={['state', 'genre']}
        />
        {/* <List listItems={restaurants}> */}
        {/* </List> */}
      </main>
    </div>
  );
}

export default App;
