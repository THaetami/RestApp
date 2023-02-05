class FavoriteRestaurantSearchPresenter {
  constructor ({ favoriteRestaurants, view }) {
    this._view = view
    this._listenToSearchRequestByUser()
    this._favoriteRestaurants = favoriteRestaurants
  }

  _listenToSearchRequestByUser () {
    this._view.runWhereUserIsSeaching((latestQuery) => {
      this._searchRestaurants(latestQuery)
    })
  }

  async _searchRestaurants (latestQuery) {
    this._latestQuery = latestQuery.trim()

    let foundRestaurants
    if (this._latestQuery.length > 0) {
      foundRestaurants = await this._favoriteRestaurants.searchRestaurant(this._latestQuery)
    } else {
      foundRestaurants = await this._favoriteRestaurants.getAllRestaurants()
    }

    this._showFoundRestaurant(foundRestaurants)
  }

  _showFoundRestaurant (restaurants) {
    this._view.showFavoriteRestaurants(restaurants)
  }

  get latestQuery () {
    return this._latetsQuery
  }
}

export default FavoriteRestaurantSearchPresenter
