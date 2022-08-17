// 載入express
const { query } = require('express')
const express = require('express')
const app = express()
const port = 3000

// 載入樣板引擎
const exphbs = require('express-handlebars')
const { blockParams } = require('handlebars/runtime')

// 載入 restaurant.json
const restaurantList = require('./restaurant.json')

// 設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 靜態檔案路徑
app.use(express.static('public'))

// 產生 district 陣列，用來動態產生下拉式選單
const districts = ['地區']
restaurantList.results.forEach(restaurant => {
  const address = restaurant.location
  const district = address.slice(address.indexOf('市') + 1, address.indexOf('區') + 1)
  if (!districts.includes(district))
    districts.push(district)
})

// 設定路由 - index 
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results, districts })
})

// 設定路由 - show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

// 設定路由 - search
app.get('/search', (req, res) => {
  let restaurants
  const type = req.query.type
  const district = req.query.district
  // 根據餐廳或分類篩選
  if (type === '餐廳、分類') {
    const keyword = req.query.keyword.toLowerCase()
    restaurants = restaurantList.results.filter(restaurant => {
      return ((restaurant.name.toLowerCase() + restaurant.category).includes(keyword))
    })
    // 根據評分篩選
  } else if (type === '評分') {
    const score = Number(req.query.keyword)
    restaurants = restaurantList.results.filter(restaurant => {
      return (restaurant.rating >= score)
    })
  }
  // 根據地區篩選
  if (district !== '地區') {
    restaurants = restaurants.filter(restaurant => {
      return (restaurant.location.includes(district))
    })
  }
  // 渲染篩選結果
  res.render('index', { restaurants, districts })
})

// 啟動伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})