import { itsActsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'

// eslint-disable-next-line no-undef
describe('Favorite Restaurants Idb Contract Test Implementation', () => {
  // eslint-disable-next-line no-undef
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id)
    })
  })

  itsActsFavoriteRestaurantModel(FavoriteRestaurantIdb)
})
