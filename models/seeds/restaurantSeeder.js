// 載入 mongoose
const mongoose = require('mongoose')

// 載入 Restaurant model
const Restaurant = require('../restaurant')

// 載入種子資料
const restaurantSeed = require('./restaurant.json').results

// 連線至資料庫
mongoose.connect(process.env.MONGODB_URI_RESTAURANTLIST)

// 取得連線狀態
const db = mongoose.connection
db.on('error', () =>
  console.log('mongodb error')
)
db.once('open', () => {
  console.log('mongodb connected')
  // 在資料庫建立種子資料
  Restaurant.create(restaurantSeed)
  console.log('done')
})