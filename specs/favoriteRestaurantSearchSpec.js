import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb'
import FavoriteRestaurantSearchPresenter from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteRestaurantSearchView from '../src/scripts/view/pages/liked-restaurants/favorite-restaurant-search-view'

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
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view
    })
  }

  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a')

      expect(presenter._latestQuery).toEqual('restaurant a')
    })

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('restaurant a')

      expect(favoriteRestaurants.searchRestaurant).toHaveBeenCalledWith('restaurant a')
    })

    it('should show the restaurant found by favorite Restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
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

    it('should show the name of the restaurant found by Favorite restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        const restaurantNames = document.querySelectorAll('.name_resto')

        expect(restaurantNames.item(0).textContent).toEqual('restaurant abc')
        expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde')
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

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        const restaurantNames = document.querySelectorAll('.name_resto')
        expect(restaurantNames.item(0).textContent).toEqual('-')

        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([
        { id: 444 }
      ])

      searchRestaurants('restaurant a')
    })
  })

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ')
      expect(presenter._latestQuery.length).toEqual(0)
    })

    it('should show all favorite restaurant', () => {
      searchRestaurants('    ')

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled()
    })
  })

  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        expect(document.querySelectorAll('.resto_not_found').length).toEqual(1)
        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([])

      searchRestaurants('restaurant a')
    })

    it('should not show any restaurant', (done) => {
      document.getElementById('cards').addEventListener('restaurantsFavorite:updated', () => {
        expect(document.querySelectorAll('.card').length).toEqual(0)
        done()
      })

      favoriteRestaurants.searchRestaurant.withArgs('restaurant a').and.returnValues([])

      searchRestaurants('restaurant a')
    })
  })
})
