exports.up = function(knex) {
  return knex.schema.createTable('civ_schematics', (t) => {
    t.string('tag').primary()
    t.string('title').notNull()
    t.string('info', 500).notNull()
    t.json('cost').notNull()
    t.integer('time').notNull()
    t.integer('limit').notNull()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('civ_schematics')
}