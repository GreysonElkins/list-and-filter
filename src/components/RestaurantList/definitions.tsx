export type restaurant = {
  id: string;
  name: string;
  city: string;
  state: string;
  telephone: string;
  tags: string;
  website: string;
  attire: string;
}

export type restaurantList = Array<restaurant>