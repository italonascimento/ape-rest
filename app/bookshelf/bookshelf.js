const env = process.env.NODE_ENV || 'development'
console.log(env)
const knexfile = require('../knexfile.js')[env]
const knex = require('knex')(knexfile)
const bookshelf = require('bookshelf')(knex)

bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin(require('bookshelf-paranoia'))

module.exports = bookshelf
