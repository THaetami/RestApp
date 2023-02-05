import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'
import FavoriteRestaurantSearchPresenter from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteRestaurantSearchView from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-view'

// eslint-disable-next-line no-undef
describe('Searching Restaurant', () => {
  let presenter
  let favoriteRestaurants
  let view

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('searchFavoriteRestaurant')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  const constructPresenter = () => {
    // eslint-disable-next-line no-undef
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view
    })
  }

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  // eslint-disable-next-line no-undef
  describe('When query is not empty', () => {
    // eslint-disable-next-line no-undef
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a')

      // eslint-disable-next-line no-undef
      expect(presenter._latestQuery).toEqual('restaurant a')
    })

    // eslint-disable-next-line no-undef
    it('should ask the model to search for restaurants', () => {
      searchRestaurants('restaurant a')

      // eslint-disable-next-line no-undef
      expect(favoriteRestaurants.searchRestaurant).toHaveBeenCalledWith('restaurant a')
    })

    // eslint-disable-next-line no-undef
    it('should show the movie found by favorite Restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.card').length).toEqual(3)
        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' }
      ])

      searchRestaurants('restaurant a')
    })

    // eslint-disable-next-line no-undef
    it('should show the name of the restaurant found by Favorite restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        const restaurantNames = document.querySelectorAll('.name_resto')

        // eslint-disable-next-line no-undef
        expect(restaurantNames.item(0).textContent).toEqual('restaurant abc')
        // eslint-disable-next-line no-undef
        expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde')
        // eslint-disable-next-line no-undef
        expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a')

        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' }
      ])

      searchRestaurants('restaurant a')
    })

    // eslint-disable-next-line no-undef
    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        const restaurantNames = document.querySelectorAll('.name_resto')
        // eslint-disable-next-line no-undef
        expect(restaurantNames.item(0).textContent).toEqual('-')

        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 444 }
      ])

      searchRestaurants('restaurant a')
    })
  })

  // eslint-disable-next-line no-undef
  describe('When query is empty', () => {
    // eslint-disable-next-line no-undef
    it('should capture the query as empty', () => {
      searchRestaurants(' ')
      // eslint-disable-next-line no-undef
      expect(presenter._latestQuery.length).toEqual(0)
    })

    // eslint-disable-next-line no-undef
    it('should show all favorite restaurant', () => {
      searchRestaurants('    ')

      // eslint-disable-next-line no-undef
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled()
    })
  })

  // eslint-disable-next-line no-undef
  describe('When no favorite restaurant could be found', () => {
    // eslint-disable-next-line no-undef
    it('should show the empty message', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.resto_not_found').length).toEqual(1)
        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([])

      searchRestaurants('restaurant a')
    })

    // eslint-disable-next-line no-undef
    it('should not show any restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        // eslint-disable-next-line no-undef
        expect(document.querySelectorAll('.card').length).toEqual(0)
        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([])

      searchRestaurants('restaurant a')
    })
  })
})
