import { restaurant, rawRestaurantData } from './definitions'

export const cleanRestaurantData = (restaurants: rawRestaurantData[]): restaurant[] => {
    return restaurants.map((
      { id, name, city, state, telephone, tags, website, genre, attire }
        ) => {
          return {
             id, name, city, state, telephone, tags, website, genre, attire
          } 
        })
}

const createErrorMessage = (error: number): string => {
  switch(error) {
    case 401:
      return "We can't get restaurants right now. Try again later!"
    default: 
      return 'Something went wrong, try again later!'
  }
} 

export const getRestaurants = (): Promise<string | restaurant[]> => {
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
        return response
      }
    })
    .then(restaurants => {
      if (Array.isArray(restaurants)) {
        return cleanRestaurantData(restaurants)
      } else {
        return createErrorMessage(restaurants.status)
      }
    })
}


