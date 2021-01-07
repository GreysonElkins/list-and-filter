import { rawRestaurantData, restaurant } from './definitions'

export const cleanRestaurantData = (restaurants: rawRestaurantData[]): restaurant[] => {
  const cleanedData = restaurants.map((
    { id, name, city, state, telephone, tags, website, genre, attire }
      ) => {
        return {
            id, name, city, state, telephone, tags, website, genre: genre.split(','), attire
        } 
      })
  return alphabetizeRestaurantByName(cleanedData)
}

const alphabetizeRestaurantByName = (restaurants: restaurant[]): restaurant[] => {
  return restaurants.sort((a, b) => {
    
    let nameA = a.name
    let nameB = b.name
    if (a.name.slice(0, 4) === 'The ') nameA = nameA.substring(4)
    if (b.name.slice(0, 4) === 'The ') nameB = nameB.substring(4)

    return nameA.localeCompare(nameB)
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
        "Authorization": ""
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


