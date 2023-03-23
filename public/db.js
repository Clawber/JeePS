const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "jeeps101",
    database: "jeeps"
});

client.connect();

// Results are returned as JSON
const res = client.query('SELECT * FROM tracker WHERE ID = 1', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end()
});

console.log(res);

module.exports = client;
