// 引入路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant model
const Restaurant = require('../../models/restaurant')

// 首頁路由
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 1 })
    .then(restaurants => {
      const name = restaurants.forEach(restaurant => restaurant.name)
      res.render('index', { restaurants })
    })
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router