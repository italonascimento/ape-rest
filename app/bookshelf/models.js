const bookshelf = require('./bookshelf')

const Field = bookshelf.Model.extend({
  tableName: 'fields',
  uuid: true,
  types: function() {
    return this.belongsToMany(Type);
  }
})

const Type = bookshelf.Model.extend({
  tableName: 'types',
  uuid: true,
  collections: function() {
    return this.hasMany(Collection);
  },
  fields: function() {
    return this.belongsToMany(Field);
  }
})

const Collection = bookshelf.Model.extend({
  tableName: 'collections',
  uuid: true,
  type: function() {
    return this.belongsTo(Type)
  }
})


exports.Field = Field
exports.Type = Type
exports.Collection = Collection
