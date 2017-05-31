const router = require('express').Router()
const models = require('../bookshelf/models')
const sendJSON = require('../utils/sendJSON')
const slugify = require('../utils/slugify')

router.get('/', (req, res, next) => {

  models.Type.forge()
    .fetchAll()
    .then(collection => {
      sendJSON(res, {
        type: 'types',
        data: collection.toJSON()
      })
    })
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const query = {id: id}

  models.Type.forge()
    .where(query)
    .fetch({withRelated: 'fields'})
    .then(collection => {
      sendJSON(res, {
        type: 'types',
        data: collection.toJSON({omitPivot: true})
      })
    })
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const type = {
    name: req.body.name,
    slug: slugify(req.body.slug || req.body.name),
  }

  const fields = req.body.fields ? JSON.parse(req.body.fields) : []

  let savedType

  models.Type.forge(type)
    .save()
    .then(model => {
      savedType = model
      return model.fields().attach(fields)
    })
    .then(model => {
      sendJSON(res, {
        type: 'types',
        data: savedType.toJSON()
      })
    })
    .catch(err => next(err))
})

module.exports = router
