const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const getDistricts = require('../../utils/districts')
  // const userId = req.user._id
  const dropDownValue = require('../../utils/dropdown')
  Restaurant.find()
    .lean()
    .sort({ _id: 1 })
    .then(restaurants => {
      const districts = getDistricts(restaurants)
      res.render('index', { restaurants, districts, dropDownValue })
    })
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router
