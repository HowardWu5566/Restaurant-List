// 引入路由器
const express = require('express')
const router = express.Router()

// 載入 Restaurant model
const Restaurant = require('../../models/restaurant')

// 新增餐廳
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => Restaurant.create(req.body)
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
)

// 瀏覽一家餐廳
router.get('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改餐廳資訊
router.get('/:id/edit', (req, res) => {
  let change = true
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant, change }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





// 匯出路由器
module.exports = router