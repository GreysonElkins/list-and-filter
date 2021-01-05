import { restaurant, rawRestaurantData } from './definitions'

const cleanRestaurantData = (restaurants: any | rawRestaurantData[]): restaurant[] | string => {
    return restaurants.map((
      { id, name, city, state, telephone, tags, website, genre, attire }
        ) => {
          return {
             id, name, city, state, telephone, tags, website, genre, attire
          } 
        })
}

export const getRestaurants = (): Promise<any | rawRestaurantData[]> => {
  return fetch(
    `https://code-challenge.spectrumtoolbox.com/api/restaurants`, 
    {
      method: 'GET',
      headers: {
        "Authorization": "Api-Key q3MNxtfep8Gt"
      }      
    })
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        return response.status
      }
    })
    .then(restaurants => {
      if (Array.isArray(restaurants)) {
        return cleanRestaurantData(restaurants)
      } else {
        return restaurants
      }
    })
}
