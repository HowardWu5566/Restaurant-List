const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const { getCategories, getDistricts } = require('../../utils/filterItems')
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 1 })
    .then(restaurants => {
      const categories = getCategories(restaurants)
      const districts = getDistricts(restaurants)
      res.render('index', { restaurants, categories, districts })
    })
    .catch(error => console.log(error))
})

module.exports = router
