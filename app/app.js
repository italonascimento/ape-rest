const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const _ = require('lodash')
const slugify = require('./utils/slugify')

const bookshelf = require('./bookshelf/bookshelf')

const fieldsRouter = require('./routes/fields')
const typesRouter = require('./routes/types')
const collectionsRouter = require('./routes/collections')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use((req,res,next) => {
  req.bookshelf = bookshelf
  next()
})

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/admin/fields', fieldsRouter)
app.use('/admin/types', typesRouter)
app.use('/admin/collections', collectionsRouter)

app.get('/*', express.static(path.join(__dirname, '../node_modules/balaclava-gui/dist')))

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send(err.message)
})

module.exports = app
