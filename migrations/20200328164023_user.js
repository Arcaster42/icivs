exports.up = function(knex) {
  return knex.schema.createTable('civ_users', (t) => {
    t.string('email').primary()
    t.string('pass_hash')
    t.timestamp('join_date').defaultTo(knex.fn.now())
    t.string('token')
    t.json('buildings')
    t.integer('money').defaultTo(1000)
    t.integer('free_pop').defaultTo(10)
    t.integer('food').defaultTo(50)
    t.integer('wood').defaultTo(20)
    t.integer('iron').defaultTo(0)
    t.integer('stone').defaultTo(0)
    t.integer('gold').defaultTo(0)
    t.integer('arms').defaultTo(0)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('civ_users')
}
