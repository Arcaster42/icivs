exports.up = function(knex) {
  return knex.schema.createTable('civ_construction', (t) => {
    t.increments('id').primary()
    t.string('civ_user').references('civ_users.email')
    t.string('civ_tag').references('civ_schematics.tag')
    t.integer('civ_time').notNull()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('civ_construction')
}
