const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const getDistricts = require('../../utils/getDistricts')

router.get('/', (req, res) => {
  const sort = req.query.sort
  // console.log(sort)
  function generateSortWay(sort) {
    switch (sort) {
      case 'nameIncrease':
        return { name: 1 }
      case 'nameDecrease':
        return { name: -1 }
      case 'byCategory':
        return { category: 1 }
      case 'byDistrict':
        return { location: 1 }
      default:
        return { _id: 1 }
    }
  }
  Restaurant.find({ userId: req.user._id })
    .lean()
    .sort(generateSortWay(req.query.sort))
    .then((restaurants) => {
      const type = req.query.type
      const keyword = req.query.keyword
      if (type === '店名') {
        restaurants = restaurants.filter((restaurant) => {
          const name =
            restaurant.name.toLowerCase() +
            restaurant.name_en.toLowerCase().trim()
          return name.includes(keyword.toLowerCase().trim())
        })
      } else if (type === '類別') {
        restaurants = restaurants.filter((restaurant) =>
          restaurant.category.includes(keyword)
        )
      } else if (type === '評分') {
        const score = Number(keyword)
        restaurants = restaurants.filter(
          (restaurant) => restaurant.rating >= score
        )
      } else if (type === '地區') {
        restaurants = restaurants.filter((restaurant) =>
          restaurant.location.includes(keyword)
        )
      }
      const districts = getDistricts(restaurants)
      res.render('index', { restaurants, type, sort, keyword, districts })
    })
})

module.exports = router
