// 載入 mongoose
const mongoose = require('mongoose')
// 連線至資料庫
mongoose.connect(process.env.MONGODB_URI_RESTAURANTLIST)
// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db