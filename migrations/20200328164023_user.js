exports.up = function(knex) {
  return knex.schema.createTable('civ_users', (t) => {
    t.increments('id').primary()
    t.string('email').notNull()
    t.string('pass_hash')
    t.timestamp('join_date').defaultTo(knex.fn.now())
    t.string('token')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('civ_users')
}
