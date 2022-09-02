// 載入express
const express = require('express')
const app = express()
const port = 3000

// 載入樣板引擎
const exphbs = require('express-handlebars')
// 設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main', }))
app.set('view engine', 'handlebars')

// 載入mongoose
const mongoose = require('mongoose')
// 連線至資料庫
mongoose.connect(process.env.MONGODB_URI_RESTAURANTLIST)
// 取得資料庫連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

// 載入 Restaurant model
const Restaurant = require('./models/restaurant')

// 靜態檔案路徑
app.use(express.static('public'))

// body parser
app.use(express.urlencoded({ extended: true }))

// 從資料庫產生 district 陣列，用來動態產生下拉式選單
const districts = ['地區']
Restaurant.find()
  .lean()
  .then(restaurants => {
    restaurants.forEach(restaurant => {
      const address = restaurant.location
      const district = address.slice(address.indexOf('市') + 1, address.indexOf('區') + 1)
      if (district && !districts.includes(district))
        districts.push(district)
    })
  })
  .catch(error => console.log(error))

// 瀏覽所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const name = restaurants.forEach(restaurant => restaurant.name)
      res.render('index', { restaurants, districts, name })
    })
    .catch(error => console.log(error))
})

// 新增餐廳
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => Restaurant.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
)

// 瀏覽一家餐廳的詳細資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改餐廳資訊
app.get('/restaurants/:id/edit', (req, res) => {
  let change = true
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, change }))
    .catch(error => console.log(error))
})
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
app.post('/restaurants/:id/delete', (req, res) => {
  console.log(req)
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 設定路由 - search
app.get('/search', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => {
      const type = req.query.type
      const district = req.query.district
      if (type === '餐廳、分類') {
        const keyword = req.query.keyword.toLowerCase()
        restaurants = restaurants.filter(restaurant =>
          (restaurant.name.toLowerCase() + restaurant.name_en.toLowerCase() + restaurant.category).includes(keyword))
      } else if (type === '評分') {
        const score = Number(req.query.keyword)
        restaurants = restaurants.filter(restaurant => restaurant.rating >= score)
      }
      if (district !== '地區') {
        restaurants = restaurants.filter(restaurant =>
          restaurant.location.includes(district))
      }
      res.render('index', { restaurants, districts })
    })
})

// 啟動伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})