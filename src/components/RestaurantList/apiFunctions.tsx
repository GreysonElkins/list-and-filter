import { restaurant, rawRestaurantData } from './definitions'

const cleanRestaurantData = (restaurants: any | rawRestaurantData[]): restaurant[] | string => {

  if (Array.isArray(restaurants)) {
    return restaurants.map((
      { id, name, city, state, telephone, tags, website, genre, attire }
        ) => {
          return {
             id, name, city, state, telephone, tags, website, genre, attire
          } 
        })
  } else {
    return 'Something went wrong, please try again'
  }
}

export const getRestaurants = (): Promise<any | rawRestaurantData[]> => {
  try {
    return fetch(
      `https://code-challenge.spectrumtoolbox.com/api/restaurants`, 
      {
        method: 'GET',
        headers: {
          "Authorization": "Api-Key q3MNxtfep8Gt"
        }      
      })
        .then(response => {
            return response.json()
          }
        )
        .then(restaurants => {
          return cleanRestaurantData(restaurants)
        })
  } catch (error) {
      return error.number
  }
}