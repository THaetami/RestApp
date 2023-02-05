import CONFIG from '../../globals/config'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const getFoods = (foods) => {
  const foodMenu = []
  foods.forEach((food) => {
    foodMenu.push(food.name)
  })

  return foodMenu.map((food) => {
    return ` ${food}`
  })
}

const createRestaurantDetailTemplate = (restaurant) => `
    <div class='body_resto'>
        <img src='${CONFIG.BASE_URL}images/medium/${restaurant.pictureId}' class='image_resto' alt="${restaurant.name}"}>
        <div class='description_resto'>
            <div class="name_resto">${restaurant.name}</div>
            <p>Rating: ${restaurant.rating}</p>
            <p>${restaurant.city}</p>
            <p>${restaurant.address}</p>
            <p>${restaurant.description}</p>
            <br><hr><hr><br>
            <p>Daftar Menu:</p>
            <div class='menu'>
            <div class='makanan'>
                ${getFoods(restaurant.menus.foods)} 
            </div>
            <div class='makanan'>
                ${getFoods(restaurant.menus.drinks)}
            </div>
            </div>
        </div>
    </div>
`

const createRestauranUserRiviewTemplate = (customerReviews) => `
    <div class='body_review'>
    <div class="user">
        <img class="lazyload" data-src="https://source.unsplash.com/48x48?User=${customerReviews.name};" alt="${customerReviews.name}">
        <div class="user-info">
            <p class="user_name">${customerReviews.name}</p>
            <small>${customerReviews.date}</small>
        </div>
    </div>
    <div class='description_riview'>
        ${customerReviews.review}
    </div>
    </div> 
`

const createRestaurantCardTemplate = (restaurant) => `
    <a href='/#/detail/${restaurant.id}' style='text-decoration: none' class="card">
        <div class="card-header">
                <img class="lazyload" data-src="${CONFIG.BASE_URL}images/small/${restaurant.pictureId}" width='80' alt='${restaurant.name || '-'}'>
        </div>
        <div class="card-body">
            <span class="tag tag-teal">Rating: ${restaurant.rating}</span>
            <div class="name_resto">${restaurant.name || '-'}</div>
            <p style='line-height: 1.3;'>${restaurant.description || '-'}</p>
            <div class="user">
                <img class="lazyload" data-src="https://source.unsplash.com/48x48?${restaurant.city || '-'}" alt='${restaurant.city || '-'}'/>
                <div class="user-info">
                    <div class="location">Location: ${restaurant.city || '-'}</div>
                    <small>Indonesia</small>
                </div>
            </div>
        </div>
    </a>
`

const createLikeRestaurantButtonTemplate = () => `
    <div id="likeRestaurantButton" class="button-area">
        <button type="submit" aria-label="like this restaurant">Favorite</button>
        <span></span>
    </div>
`

const createUnlikeRestaurantButtonTemplate = () => `
    <div id="likeRestaurantButton" class="button-area">
        <button type="submit" aria-label="unlike this restaurant">Batal Favorite</button>
        <span></span>
    </div>
`

export {
  createRestaurantCardTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createRestauranUserRiviewTemplate
}
