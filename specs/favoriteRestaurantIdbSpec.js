import { itsActsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'

// eslint-disable-next-line no-undef
describe('Favorite Movie Idb Contract Test Implementation', () => {
  // eslint-disable-next-line no-undef
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (movie) => {
      await FavoriteRestaurantIdb.deleteRestaurant(movie.id)
    })
  })

  itsActsFavoriteRestaurantModel(FavoriteRestaurantIdb)
})
