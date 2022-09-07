// 載入express
const express = require('express')
const app = express()
const port = 3000

// 載入 method-override
const methodOverride = require('method-override')

// 載入樣板引擎
const exphbs = require('express-handlebars')
// 設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 連線 mongoose
require('./config/mongoose')

// 引入路由器
const routes = require('./routes')

// 靜態檔案路徑
app.use(express.static('public'))

// body parser
app.use(express.urlencoded({ extended: true }))

// 用 method-override 處理路由
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 啟動伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
