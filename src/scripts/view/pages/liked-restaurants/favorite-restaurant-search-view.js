import { createRestaurantCardTemplate } from '../../templates/template-creator'

class FavoriteRestaurantSearchView {
  getTemplate () {
    return `
        <div id='detail_page'></div>
        <main id='main__favorite'>
            <section class="content">
                <div class="latest">
                <div class='page_header'>
                    <div class="latest__label" id="maincontent">Favorite Restaurants List</div>
                    <div class='search_bar'>
                        <div class="dbl-field">
                        <div class="field">
                            <input type="text" name="name" id='searchFavoriteRestaurant' placeholder="Search Favorite Restaurant">
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="posts" id='cards'>
                </div>
                </div>
            </section>
        </main>
    `
  }

  runWhereUserIsSeaching (callback) {
    document.getElementById('searchFavoriteRestaurant').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showFavoriteRestaurants (restaurants = []) {
    let html
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantCardTemplate(restaurant)), '')
    } else {
      html = this._getEmptyRestaurantTemplate()
    }

    document.getElementById('cards').innerHTML = html
    document.getElementById('cards').dispatchEvent(new Event('restaurantsFavorite:updated'))
  }

  _getEmptyRestaurantTemplate () {
    return '<p class="resto_not_found">Tidak ada restaurants untuk ditampilkan</p>'
  }
}

export default FavoriteRestaurantSearchView
