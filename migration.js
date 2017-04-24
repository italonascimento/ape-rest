exports.up = function(knex, Promise) {
  return knex.schema.createTable('types', function(table) {
    table.string('id').primary()
    table.string('name')
    table.string('attributes')
  }).createTable('collections', function(table) {
    table.string('id').primary()
    table.string('name')
    table.string('slug')
    table.string('type_id').unique().references('types.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('types')
    .dropTable('collections');
};
