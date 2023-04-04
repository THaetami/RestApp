import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'
import * as TestFactories from './helpers/testFactories'

// eslint-disable-next-line no-undef
describe('Unlike A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="button_favorite"></div>'
  }

  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    addLikeButtonContainer()
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 })
  })

  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1)
  })

  // eslint-disable-next-line no-undef
  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy()
  })

  // eslint-disable-next-line no-undef
  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy()
  })

  // eslint-disable-next-line no-undef
  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

    await FavoriteRestaurantIdb.deleteRestaurant(1)

    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })

  // eslint-disable-next-line no-undef
  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonPresentWithRestaurant({ id: 1 })

    await FavoriteRestaurantIdb.deleteRestaurant(1)

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'))

    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
  })
})
