import { createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate } from '../view/templates/template-creator'

const likeButtonPresenter = {
  async init ({ favoriteButtonContainer, favoriteRestaurants, restaurant }) {
    this._favoriteButtonContainer = favoriteButtonContainer
    this._restaurant = restaurant
    this._favoriteRestaurants = favoriteRestaurants

    await this._renderButton()
  },

  async _renderButton () {
    const { id } = this._restaurant

    if (await this._isRestaurantExist(id)) {
      this._renderLiked()
    } else {
      this._renderLike()
    }
  },

  async _isRestaurantExist (id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id)
    return !!restaurant
  },

  _renderLike () {
    this._favoriteButtonContainer.innerHTML = createLikeRestaurantButtonTemplate()

    const favoriteButton = document.querySelector('#likeRestaurantButton')
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant)
      this._renderButton()
    })
  },

  _renderLiked () {
    this._favoriteButtonContainer.innerHTML = createUnlikeRestaurantButtonTemplate()

    const favoriteButton = document.querySelector('#likeRestaurantButton')
    favoriteButton.addEventListener('click', async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id)
      this._renderButton()
    })
  }

}

export default likeButtonPresenter
