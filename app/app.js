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

// app.get('/api/:collection/:entity?', (req, res, next) => {
//   const collection = req.params.collection
//   const entity = req.params.entity
//
//   const query = _.omit({collection: collection, _id: entity}, entity ? '' : '_id')
//
//   const get = db
//     .get('entities')
//     .find(query, '-collection')
//
//   get.then(results => {
//     const result = entity ? results[0] : results
//
//     sendJSON(res, {
//       type: collection,
//       data: result
//     })
//   })
//
//   get.catch(err => {
//     next(err)
//   })
// })

// app.post('/api/:collection', (req, res, next) => {
//   const collection = req.params.collection
//   const db = req.db
// })

app.use('/admin/fields', fieldsRouter)
app.use('/admin/types', typesRouter)
app.use('/admin/collections', collectionsRouter)

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
