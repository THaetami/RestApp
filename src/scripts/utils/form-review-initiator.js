import RestaurantDbSource from '../data/restaurantsdb-source'
import { createRestauranUserRiviewTemplate } from '../view/templates/template-creator'

const formReviewInitiator = {
  init ({ nameReviewer, reviewer, buttonReviewerContainer, id, restaurantUserReviewContainer }) {
    buttonReviewerContainer.addEventListener('click', async () => {
      this._addReview(nameReviewer, reviewer, id, restaurantUserReviewContainer)
    })
  },

  async _addReview (nameReviewer, review, id, restaurantUserReviewContainer) {
    const body = {
      id,
      name: nameReviewer.value,
      review: review.value
    }
    const response = await RestaurantDbSource.addReview({ body })
    if (response.error === false) {
      review.value = ''
      nameReviewer.value = ''
      // eslint-disable-next-line no-undef
      alert(`Terimakasih atas reviewnya :) ${body.name}`)
      restaurantUserReviewContainer.innerHTML = ''
      // CacheHelper.revalidateCache(response)
      const data = response.customerReviews.reverse()
      data.forEach((userReview) => {
        restaurantUserReviewContainer.innerHTML += createRestauranUserRiviewTemplate(userReview)
      })
    }
  }
}

export default formReviewInitiator
