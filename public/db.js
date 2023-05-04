// npm install pg (not in node_modules in our case, in TypeScript local due to CS 150)
import PG from 'pg';

const Client = PG.Client;
const Pool = PG.Pool;       // Leaving this here (although Unused) as Pool have dynamic/concurrency advantages over Client (I just don't know how to close it)

const connection = "postgres://admin:FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6@dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com/jeeps?ssl=true"

// Also use connectionString key to circumvent SSL errors with ?ssl=true suffix
const client = new Client({
    host: "dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com",
    user: "admin",
    port: 5432,
    password: "FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6",
    database: "jeeps",
    connectionString: connection
});

client.connect();

// TODO: For CRUD, vary query string and .query() listener function (this is only Read)
let jeepneyID = 1;
let queryString = `SELECT coords FROM tracker WHERE id = ${jeepneyID} ORDER by id`;
let coords;

// Results are returned as JSON
// HERE: We will query database for coords of jeepneyID
client.query(queryString, (err, res) => {
    if (!err) {
        console.log(res.rows);
        coords = res.rows[0].coords;
        console.log("x = " + coords.x);
        console.log("y = " + coords.y);
    } else {
        console.log(err.message);
    }
    client.end();
})