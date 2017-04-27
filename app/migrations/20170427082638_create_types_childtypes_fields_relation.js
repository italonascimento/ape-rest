exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('fields', table => {
      table.uuid('id').primary()
      table.string('name')
      table.string('slug').unique()
    })
    .createTable('types_childtypes', table => {
      table.uuid('id').primary()
      table.uuid('type_id').references('types.id')
      table.uuid('childtype_id').references('types.id')
    })
    .createTable('types_fields', table => {
      table.uuid('id').primary()
      table.uuid('type_id').references('types.id')
      table.uuid('field_id').references('fields.id')
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('types_childtypes')
    .dropTable('types_fields')
    .dropTable('fields')
}
