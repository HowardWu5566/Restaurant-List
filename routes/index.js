// 引入路由器
const express = require('express')
const router = express.Router()

// 引入 home, restaurants 或search 模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

// 路由符合就導向 home, restaurants 或search 模組
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/users', users)

// 匯出路由器
module.exports = router
