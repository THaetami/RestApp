import API_ENDPOINT from '../globals/api-endpoint'

class RestaurantDbSource {
  static async Home () {
    const response = await fetch(API_ENDPOINT.HOME)
    const responseJson = await response.json()
    return responseJson.restaurants
  }

  static async detailRestaurant (id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id))
      return response
    } catch (error) {
      return 'not connection'
    }
  }

  static async searchRestaurant (query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query))
    return response.json()
  }

  static async addReview ({ body }) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return response.json()
  }
}

export default RestaurantDbSource
