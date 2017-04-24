const bookshelf = require('./bookshelf')

const Collection = bookshelf.Model.extend({
  tableName: 'collections',
  uuid: true,
  type: function() {
    return this.belongsTo(Type)
  }
})

const Type = bookshelf.Model.extend({
  tableName: 'types',
  uuid: true,
  collection: function() {
    return this.hasMany(Collection);
  }
})


exports.Collection = Collection
exports.Type = Type
