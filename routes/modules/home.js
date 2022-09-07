// 引入路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant model
const Restaurant = require('../../models/restaurant')

// 首頁路由
router.get('/', (req, res) => {
  // 載入function getDistricts 和下拉選單的值
  const getDistricts = require('../../utils/districts')
  const dropDownValue = require('../../utils/dropdown')
  Restaurant.find()
    .lean()
    .sort({ _id: 1 })
    .then((restaurants) => {
      const districts = getDistricts(restaurants)
      res.render('index', { restaurants, districts, dropDownValue })
    })
    .catch((error) => console.log(error))
})

// 匯出路由器
module.exports = router
