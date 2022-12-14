const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const session = require('express-session')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const flash = require('connect-flash')
const routes = require('./routes')
const usePassport = require('./config/passport')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: handlebarsHelpers }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})
