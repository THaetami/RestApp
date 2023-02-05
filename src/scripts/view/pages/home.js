import RestaurantDbSource from '../../data/restaurantsdb-source'
import { createRestaurantCardTemplate } from '../templates/template-creator'
import searchbarInitiator from '../../utils/searchbar-initiator'

const Home = {
  async render () {
    return `
        <div id='detail_page'></div>
        <jumbotron-template></jumbotron-template>
        <main id='main__home'>
            <section class="content">
                <div class="latest">
                  <div class='page_header'>
                    <p class="latest__label" id="maincontent">Restaurants List</p>
                    <div class='search_bar'>
                      <div class="dbl-field">
                        <div class="field">
                          <input type="text" name="name" id='searching' placeholder="Search Restaurant">
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  <div class="posts" id='cards' id='inti'></div>
                </div>
            </section>
        </main>
    `
  },

  async afterRender () {
    const searchbarContainer = document.querySelector('#searching')
    const restaurantsContainer = document.querySelector('#cards')

    searchbarInitiator.init({ searchbarContainer, restaurantsContainer })

    const restaurants = await RestaurantDbSource.Home()
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantCardTemplate(restaurant)
    })
  }
}

export default Home
