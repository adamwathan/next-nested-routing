import knex from 'knex'

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
})

export default db