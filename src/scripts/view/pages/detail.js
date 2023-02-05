import UrlParser from '../../routes/url-parser'
import RestaurantDbSource from '../../data/restaurantsdb-source'
import { createRestaurantDetailTemplate, createRestauranUserRiviewTemplate } from '../templates/template-creator'
import likeButtonPresenter from '../../utils/like-button-presenter'
import formReviewInitiator from '../../utils/form-review-initiator'
import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb'

const Detail = {
  async render () {
    return `
        <div id='detail_page'></div>
        
        <main style='margin: 0 auto;'>
            <div class='posisi_button'>
              <div id='button_favorite'></div>
            </div>

            <div id='body__resto'></div>

            <div class='review_resto'>

              <div class="wrapper">
                <div id="form_review">
                  <div class="dbl-field">
                      <div class="field">
                          <input type="text" id='name_reviewer' name="name" placeholder="Enter your name">
                      </div>
                  </div>
                  <div class="message">
                      <textarea placeholder="Write your message" id='reviewer' name="message"></textarea>
                  </div>
                  <div class="button-area">
                      <button id='add_review' >Send Review</button>
                      <span></span>
                  </div>
                </div>
              </div>   
              
              <div id='user_review'></div>
            </div>

          </main>
        `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()

    const formReviewContainer = document.querySelector('.review_resto')

    const response = await RestaurantDbSource.detailRestaurant(url.id)
    if (response === 'not connection') {
      formReviewContainer.innerHTML = `
        <div class="not_connection">
          <p>Tidak ada akses internet</p>
        </div>
      `
    }

    const restaurant = await response.json()
    const restaurantContainer = document.querySelector('#body__resto')
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant)

    const id = url.id
    const restaurantUserReviewContainer = document.querySelector('#user_review')
    const nameReviewer = document.querySelector('#name_reviewer')
    const reviewer = document.querySelector('#reviewer')
    const buttonReviewerContainer = document.querySelector('#add_review')
    const data = restaurant.restaurant.customerReviews.reverse()
    data.forEach((userReview) => {
      restaurantUserReviewContainer.innerHTML += createRestauranUserRiviewTemplate(userReview)
    })
    formReviewInitiator.init({ nameReviewer, reviewer, buttonReviewerContainer, id, restaurantUserReviewContainer })

    likeButtonPresenter.init({
      favoriteButtonContainer: document.querySelector('#button_favorite'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        address: restaurant.restaurant.address,
        city: restaurant.restaurant.city,
        rating: restaurant.restaurant.rating,
        description: restaurant.restaurant.description,
        pictureId: restaurant.restaurant.pictureId
      }
    })
  }
}

export default Detail
