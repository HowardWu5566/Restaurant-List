// 載入express
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

// 設定路由 - index 
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 設定路由 - show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

// 設定路由 - search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return (restaurant.name.toLowerCase() + restaurant.category).includes(keyword)
  })

  res.render('index', { restaurants })
})

// 啟動伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})