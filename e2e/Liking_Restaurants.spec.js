const assert = require('assert')

Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('Tidak ada restaurants untuk ditampilkan', '.resto_not_found')
})

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurants untuk ditampilkan', '.resto_not_found')

  I.amOnPage('/')

  I.seeElement('.name_resto')

  const firstRestaurant = locate('.name_resto').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)
  I.click(firstRestaurant)

  I.seeElement('#likeRestaurantButton')
  I.click('#likeRestaurantButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.card')
  const LikedRestaurantName = await I.grabTextFrom('.name_resto')

  assert.strictEqual(firstRestaurantName, LikedRestaurantName)
})

Scenario('Unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurants untuk ditampilkan', '.resto_not_found')

  I.amOnPage('/')

  I.seeElement('.name_resto')

  const firstRestaurant = locate('.name_resto').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)

  I.click(firstRestaurant)

  I.seeElement('#likeRestaurantButton')
  I.click('#likeRestaurantButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.card')
  const LikedRestaurantName = await I.grabTextFrom('.name_resto')

  assert.strictEqual(firstRestaurantName, LikedRestaurantName)

  I.click('.card')

  I.seeElement('#likeRestaurantButton')
  I.click('#likeRestaurantButton')

  I.amOnPage('/#/favorite')

  I.see('Tidak ada restaurants untuk ditampilkan', '.resto_not_found')
})

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurants untuk ditampilkan', '.resto_not_found')

  I.amOnPage('/')

  I.seeElement('.name_resto')

  const names = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.name_resto').at(i))
    I.seeElement('#likeRestaurantButton')
    I.click('#likeRestaurantButton')
    names.push(await I.grabTextFrom('.name_resto'))
    I.amOnPage('/')
  }

  I.amOnPage('/#/favorite')
  I.seeElement('#searchFavoriteRestaurant')

  const searchQuery = names[1].substring(1, 3)
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1)

  I.fillField('#searchFavoriteRestaurant', searchQuery)
  I.pressKey('Enter')

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.card')
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants)

  matchingRestaurants.forEach(async (title, index) => {
    const visibleName = await I.grabTextFrom(locate('.name_resto').at(index + 1))
    assert.strictEqual(title, visibleName)
  })
})

Scenario('Add review restaurant', async ({ I }) => {
  I.amOnPage('/')

  I.seeElement('.card')

  const firstRestaurant = locate('.card').first()
  I.click(firstRestaurant)

  I.seeElement('#name_reviewer')
  I.seeElement('#reviewer')

  I.fillField('#name_reviewer', 'jajang')
  I.fillField('#reviewer', 'tambah review')

  I.click('#add_review')
  I.pressKey('Enter')

  const userName = await I.grabTextFrom(locate('.user_name').first())
  assert.strictEqual(userName, 'jajang')

  const userDescription = await I.grabTextFrom(locate('.description_riview').first())
  assert.strictEqual(userDescription, 'tambah review')
})
