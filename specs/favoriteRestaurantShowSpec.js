import FavoriteRestaurantSearchView from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-view'
import FavoriteRestaurantShowPresenter from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-show-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'

// eslint-disable-next-line no-undef
describe('Showing all favorite restaurants', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    renderTemplate()
  })

  // eslint-disable-next-line no-undef
  describe('When no restaurants have been liked', () => {
    // eslint-disable-next-line no-undef
    it('should ask for the favorite restaurants', () => {
      // eslint-disable-next-line no-undef
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
      // eslint-disable-next-line no-undef
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
    })

    // eslint-disable-next-line no-undef
    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.resto_not_found').length).toEqual(1)
        done()
      })

      // eslint-disable-next-line no-undef
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      favoriteRestaurants.getAllRestaurants.and.returnValues([])

      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
    })
  })

  // eslint-disable-next-line no-undef
  describe('When favorite restaurants exists', () => {
    // eslint-disable-next-line no-undef
    it('should show the restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.card').length).toEqual(2)
        done()
      })

      // eslint-disable-next-line no-undef
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      favoriteRestaurants.getAllRestaurants.and.returnValue([
        {
          id: 11,
          name: 'A',
          rating: 5,
          description: 'Sebuah film A'
        },
        {
          id: 22,
          name: 'B',
          rating: 4,
          description: 'Sebuah film B'
        }
      ])

      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
    })
  })
})
