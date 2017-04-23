var knex = require('knex')(require('./knexfile.js'))

const bookshelf = require('bookshelf')(knex)

bookshelf.plugin(require('bookshelf-uuid'))
bookshelf.plugin(require('bookshelf-paranoia'))

module.exports = bookshelf
