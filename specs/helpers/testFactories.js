import FavoriteRestaurantIdb from '../../src/scripts/data/favorite-restaurants-idb'
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter'

const createLikeButtonPresentWithRestaurant = async (restaurant) => {
  await LikeButtonPresenter.init({
    favoriteButtonContainer: document.querySelector('#button_favorite'),
    favoriteRestaurants: FavoriteRestaurantIdb,
    restaurant
  })
}

export { createLikeButtonPresentWithRestaurant }
