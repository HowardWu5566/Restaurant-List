const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantSeed = require('./restaurant.json').results
const db = require('../../config/mongoose')

const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  collection: [0, 1, 2]
}, {
  name: 'user2,',
  email: 'user2 @example.com',
  password: '12345678',
  collection: [3, 4, 5]
}]

db.once('open', () => {
  Promise.all(SEED_USERS.map((SEED_USER) =>
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      // 建立種子資料 - 使用者
      .then(hash => {
        return User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        })
      })
      // 建立種子資料 - 使用者收藏餐廳
      .then(user => {
        const SEED_RESTAURANT = SEED_USER.collection.map(index => {
          restaurantSeed[index].userId = user._id
          return restaurantSeed[index]
        })
        return Restaurant.create(SEED_RESTAURANT)
      })
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})