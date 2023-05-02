const pg = require('pg');
const Client = pg.Client;

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "jeeps101",
    database: "jeeps"
});

client.connect();

const queryString = 'SELECT coords FROM tracker WHERE id = 3';

// Results are returned as JSON
client.query(queryString, (err, res) => {
    if (!err) {
        console.log(res.rows);
        console.log("xcoord = " + res.rows[0].coords.x);
        console.log("ycoord = " + res.rows[0].coords.y);
    } else {
        console.log(err.message);
    }
    client.end()
});

// export default client; 