// 載入 mongoose
const mongoose = require('mongoose')

// 載入 Restaurant model
const Restaurant = require('../restaurant')

// 載入種子資料
const restaurantSeed = require('./restaurant.json').results

// 連線 mongoose
const db = require('../../config/mongoose')

db.once('open', () => {
  // 在資料庫建立種子資料
  Restaurant.create(restaurantSeed)
  console.log('done')
})