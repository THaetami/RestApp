import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'
import * as TestFactories from './helpers/testFactories'

describe('Unlike A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="button_favorite"></div>'
  }

  beforeEach(async () => {
    addLikeButtonContainer()
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
  })

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

    await FavoriteRestaurantIdb.deleteRestaurant(1)

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    await FavoriteRestaurantIdb.deleteRestaurant(1)

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })
})
