const uuid = require('uuid/v4')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('fields_types').del()
    .then(function() {
      return knex('fields').del()
    })
    .then(function() {
      return knex('types').del()
    })
    .then(function () {
      return knex('fields').insert([
        {id: uuid(), name: 'Singleline', slug: 'singleline'},
        {id: uuid(), name: 'Multiline', slug: 'multiline'},
        {id: uuid(), name: 'Single choice', slug: 'single-choice'},
        {id: uuid(), name: 'Multichoice', slug: 'multichoice'},
      ]);
    });
};
