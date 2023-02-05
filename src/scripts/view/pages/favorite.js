import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb'
import FavoriteRestaurantSearchView from './liked-restaurants/favorite-restaurant-search-view'
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteRestaurantShowPresenter from './liked-restaurants/favorite-restaurant-show-presenter'

const view = new FavoriteRestaurantSearchView()

const Favorite = {
  async render () {
    return view.getTemplate()
  },

  async afterRender () {
    // eslint-disable-next-line no-new
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb })
    // eslint-disable-next-line no-new
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb })
  }
}

export default Favorite
