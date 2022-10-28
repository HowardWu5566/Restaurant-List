const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const getDistricts = require('../../utils/getDistricts')
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 1 })
    .then(restaurants => {
      const districts = getDistricts(restaurants)
      res.render('index', { restaurants, districts })
    })
    .catch(error => console.log(error))
})

module.exports = router
