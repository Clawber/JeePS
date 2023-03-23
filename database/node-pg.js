const express = require("express");
const app = express();

// Start server on client's IP address.

const serverIP = "";
const port = "5000";

// NOTE: Hardcode serverIP to always use the same one on build so no
// need to change every time WiFi connection is changed.
// NOTE: Stop using PHP local dev server, use this server manager
// or npm run serve instead
app.listen(port, () => {
    console.log(`Server has started on address ${serverIP}, port ${port}.`);
});

const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
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