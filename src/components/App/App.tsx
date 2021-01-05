// import logo from './logo.svg';
import React from 'react'

import RestaurantList from '../RestaurantList/RestaurantList.tsx'

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello App
        </p>
      </header>
      <main> 
        <RestaurantList>
        </RestaurantList>
      </main>
    </div>
  );
}

export default App;
