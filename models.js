const bookshelf = require('./bookshelf')

const Collection = bookshelf.Model.extend({
  tableName: 'collections',
  type: function() {
    return this.hasOne(Types)
  }
})

const Type = bookshelf.Model.extend({
  tableName: 'types',
  collection: function() {
    return this.belongsTo(Collection);
  }
})


exports.Collection = Collection
exports.Type = Type
