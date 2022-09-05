// 引入路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant model
const Restaurant = require('../../models/restaurant')

// 從資料庫產生 district 陣列，用來動態產生下拉式選單 (暫時用不到但我捨不得刪)
// const districts = ['地區']
// Restaurant.find()
//   .lean()
//   .then(restaurants => {
//     restaurants.forEach(restaurant => {
//       const address = restaurant.location
//       const district = address.slice(address.indexOf('市') + 1, address.indexOf('區') + 1)
//       if (district && !districts.includes(district))
//         districts.push(district)
//     })
//   })
//   .catch(error => console.log(error))

// 排序方式
function generateSortWay(sort) {
  switch (sort) {
    case '地區':
      return { location: 1 }
    case 'Z --> A':
      return { name: -1 }
    case '類別':
      return { category: 1 }
    default:
      return { name: 1 }
  }
}

// 搜尋功能
router.get('/', (req, res) => {
  const sort = req.query.sort
  Restaurant.find()
    .lean()
    .sort(generateSortWay(sort))
    .then(restaurants => {
      const type = req.query.type
      const keyword = req.query.keyword
      if (type === '店名') {
        restaurants = restaurants.filter(restaurant => {
          const name = restaurant.name.toLowerCase() + restaurant.name_en.toLowerCase().trim()
          return name.includes(keyword.toLowerCase().trim())
        })
      } else if (type === '類別') {
        restaurants = restaurants.filter(restaurant =>
          restaurant.category.includes(keyword))
      } else if (type === '評分') {
        const score = Number(keyword)
        restaurants = restaurants.filter(restaurant => restaurant.rating >= score)
      } else if (type === '地區') {
        restaurants = restaurants.filter(restaurant =>
          restaurant.location.includes(keyword))
      }
      res.render('index', { restaurants, keyword })
    })
})

// 匯出路由器
module.exports = router