exports.up = function(knex, Promise) {
  return knex.schema.createTable('types', function(table) {
    table.uuid('id').primary()
    table.string('name')
    table.string('slug').unique()
  }).createTable('collections', function(table) {
    table.uuid('id').primary()
    table.string('name')
    table.string('slug').unique()
    table.uuid('type_id').references('id')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('collections')
    .dropTable('types')
}
