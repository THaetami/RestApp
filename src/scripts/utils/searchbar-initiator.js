import RestaurantDbSource from '../data/restaurantsdb-source'
import Home from '../view/pages/home'
import { createRestaurantCardTemplate } from '../view/templates/template-creator'

const searchbarInitiator = {
  init ({ searchbarContainer, restaurantsContainer }) {
    searchbarContainer.addEventListener('keypress', async (e) => {
      if (e.keyCode === 13) {
        this._searching(searchbarContainer.value, restaurantsContainer)
      }
    })
  },

  async _searching (value, restaurantsContainer) {
    if (value) {
      const restaurants = await RestaurantDbSource.searchRestaurant(value)
      if (restaurants.restaurants.length) {
        restaurantsContainer.innerHTML = ''
        restaurants.restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantCardTemplate(restaurant)
        })
      } else {
        restaurantsContainer.innerHTML = '<p style="font-size: 23px;">Restaurants Tidak Ditemukan</p>'
      }
    } else {
      restaurantsContainer.innerHTML = ''
      await Home.afterRender()
    }
  }

}

export default searchbarInitiator
