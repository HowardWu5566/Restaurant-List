// 載入express
const express = require('express')
const app = express()
const port = 3000

// 載入 method-override
const methodOverride = require('method-override')

// 載入樣板引擎
const exphbs = require('express-handlebars')
// 設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main', }))
app.set('view engine', 'handlebars')

// 載入 mongoose
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
// 用 method-override 處理路由
app.use(methodOverride('_method'))



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

// 瀏覽所有餐廳
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 1 })
    .then(restaurants => {
      const name = restaurants.forEach(restaurant => restaurant.name)
      res.render('index', { restaurants })
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
app.put('/restaurants/:id', (req, res) => {
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
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋功能
app.get('/search', (req, res) => {
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


// 啟動伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})


