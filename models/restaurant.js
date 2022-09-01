// 載入 mongoose
const mongoose = require('mongoose')

// 定義資料結構
const Schema = mongoose.Schema
const resturantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
  },
  phone: {
    type: String,
  },
  google_map: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  }
})

// 匯出 Restaurant model
module.exports = mongoose.model('Restaurant', resturantSchema)