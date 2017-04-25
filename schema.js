exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('types', function(table) {
    table.string('id').unique().primary()
    table.string('name')
    table.string('attributes')
  }).createTableIfNotExists('collections', function(table) {
    table.string('id').primary()
    table.string('name')
    table.string('slug')
    table.string('type_id').unique().references('types.id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('types')
    .dropTable('collections')
}
