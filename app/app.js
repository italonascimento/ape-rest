const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const _ = require('lodash')
const slugify = require('./utils/slugify')

const bookshelf = require('./bookshelf/bookshelf')

const typesRouter = require('./routes/types')

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

// app.get('/admin/collections/:collection?', (req, res, next) => {
//   const collection = req.params.collection
//   const db = req.db
//
//   const query = _.omit({_id: collection}, collection ? '' : '_id')
//
//   const get = db
//     .get('collections')
//     .find(query)
//
//   get.then(results => {
//     const result = collection ? results[0] : results
//
//     sendJSON(res, {
//       type: 'collections',
//       data: result
//     })
//   })
//
//   get.catch(err => {
//     next(err)
//   })
// })

// app.post('/admin/collections', (req, res, next) => {
//   const collection = {
//     title: req.body.title,
//     slug: slugify(req.body.slug || req.body.title),
//     type: {_id: req.body.type}
//   }
//
//   const db = req.db
//   const findType = db
//     .get('types')
//     .find({_id: collection.type._id}, 'title')
//
//   findType.then(results => {
//     if(results.length === 0){
//       const err = new Error('Collection type is not valid.')
//       err.status = 400
//       next(err)
//     }
//
//     const type = results[0]
//     collection.type.title = type.title
//
//     const insert = db
//       .get('collections')
//       .insert(collection)
//
//     insert.then(result => {
//       sendJSON(res, {
//         type: 'collections',
//         data: result
//       })
//     })
//
//     insert.catch(err => {
//       next(err)
//     })
//   })
//
//   findType.catch(err => {
//     next(err)
//   })
// })

app.use('/admin/types', typesRouter)

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
