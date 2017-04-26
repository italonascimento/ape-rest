const router = require('express').Router()
const models = require('../bookshelf/models')
const sendJSON = require('../utils/sendJSON')

router.get('/:id?', (req, res, next) => {
  const id = req.params.id
  const query = id ? {id: id} : {}

  models.Type.forge()
    .where(query)
    .fetchAll()
    .then(collection => {
      const result = id ? collection.at(0) : collection

      sendJSON(res, {
        type: 'types',
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
    attributes: req.body.attributeskne
  }

  models.Type.forge(type)
    .save()
    .then(model => {
      sendJSON(res, {
        type: 'collections',
        data: model.toJSON()
      })
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
