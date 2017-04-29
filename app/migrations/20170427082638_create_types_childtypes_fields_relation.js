exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('fields', table => {
      table.uuid('id').primary()
      table.string('name')
      table.string('slug').unique()
    })
    .createTable('childtypes_types', table => {
      table.increments('id')
      table.uuid('type_id').references('types.id')
      table.uuid('childtype_id').references('types.id')
    })
    .createTable('fields_types', table => {
      table.increments('id')
      table.uuid('type_id').references('types.id')
      table.uuid('field_id').references('fields.id')
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('childtypes_types')
    .dropTable('fields_types')
    .dropTable('fields')
}
