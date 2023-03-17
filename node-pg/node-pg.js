// Simplest way to connect to pg.
const { Client } = require('pg')
const client = new Client()
await client.connect()
 
const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()

// With callbacks
/*
const { Client } = require('pg')
const client = new Client()
 
client.connect()
 
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  client.end()
})
*/