const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "jeeps101",
    database: "jeeps"
});

client.connect();

client.query('SELECT * FROM tracker', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    client.end()
});
