import FavoriteRestaurantSearchView from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-view'
import FavoriteRestaurantShowPresenter from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-show-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'

describe('Showing all favorite restaurants', () => {
  let view

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
    })

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        expect(document.querySelectorAll('.resto_not_found').length).toEqual(1)
        done()
      })

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      favoriteRestaurants.getAllRestaurants.and.returnValues([])

      // eslint-disable-next-line no-new
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants
      })
    })
  })

  describe('When favorite restaurants exists', () => {
    it('should show the restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        expect(document.querySelectorAll('.card').length).toEqual(2)
        done()
      })

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
