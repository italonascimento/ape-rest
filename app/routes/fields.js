const router = require('express').Router()
const models = require('../bookshelf/models')
const sendJSON = require('../utils/sendJSON')
const slugify = require('../utils/slugify')

router.get('/:id?', (req, res, next) => {
  const id = req.params.id
  const query = id ? {id: id} : {}

  models.Field.forge()
    .where(query)
    .fetchAll()
    .then(collection => {
      const result = id ? collection.at(0) : collection

      sendJSON(res, {
        type: 'fields',
        data: result.toJSON()
      })
    })
    .catch(err => {
      next(err)
    })
})

router.post('/', (req, res, next) => {
  const type = {
    name: req.body.name,
    slug: slugify(req.body.slug || req.body.name),
  }

  models.Field.forge(type)
    .save()
    .then(model => {
      sendJSON(res, {
        type: 'fields',
        data: model.toJSON()
      })
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
