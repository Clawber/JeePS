// npm install pg (not in node_modules in our case, in TypeScript local due to CS 150)
import PG from 'pg';

const Pool = PG.Pool;

const connectionString = "postgres://admin:FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6@dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com/jeeps?ssl=true"

// Use connectionString key to circumvent SSL errors with ?ssl=true suffix
const pool = new Pool({
    connectionString: connectionString
});

const getAllCoords = pool.query('SELECT * FROM tracker ORDER BY id')
    .then(response => {return response.rows})

const getCoords = (trackerID) => {
    getAllCoords.then((rows) => {
        console.log(rows.find(elem => elem.id == trackerID))
    })
}

// USAGE
getCoords(1);
getCoords(2);

// TODO: For CRUD, vary query string and .query() listener function (this is only Read)

// jeepney FKs are driver, route, and tracker.
// Hence, these must be `ideally` filled before jeepney is created.
// We say ideally because they are nullable.
// Ex.  driver = {firstName: string, lastName: string}
//      route = {name: string, color: string}
//      tracker = true
//      
function createJeep(driver, route, tracker, jeepney,  pool) {
    let queryString;
    let [driverID, routeID, trackerID] = [null, null, null];
    let jeepneyID;  // will store return val

    if (driver != null) {
        queryString = `INSERT INTO driver (firstName, lastName) 
                        VALUES ('${driver.firstName}', '${driver.lastName}')
                        SELECT max(id) FROM driver`;
        client.query(queryString, (err, res) => {
            if (!err) {
                console.log(res.rows);
                driverID = res.rows[0].id;
            } else {
                console.log(err.message);
            }
        })
    }

    if (route != null) {
        queryString = `INSERT INTO route (name, color, path) 
                        VALUES ('${route.name}', ${route.color}, ${route.path});
                        SELECT max(id) FROM route`;
        client.query(queryString, (err, res) => {
            if (!err) {
                console.log(res.rows);
                routeID = res.rows[0].id;
            } else {
                console.log(err.message);
            }
        })
    }

    if (tracker != null) {
        queryString = `INSERT INTO tracker (coords) VALUES ('(0, 0)');
                SELECT max(id) FROM tracker`;
        client.query(queryString, (err, res) => {
            if (!err) {
                console.log(res.rows);
                trackerID = res.rows[0].id;
            } else {
                console.log(err.message);
            }
        })
    }

    queryString = `INSERT INTO jeepney (trackerID, routeID, driverID, plateNumber, capacity) 
                    VALUES (${driverID}, ${routeID}, ${trackerID}, '${jeepney.plateNumber}', ${jeepney.capacity})`;
    client.query(queryString)
        .then(() => client.query(`SELECT max(id) FROM jeepney`, (err, res) => {
            if (!err) {
                console.log(res.rows);
                jeepneyID = res.rows[0].max;
            } else {
                console.log(err.message);
            }
        }))
}

let jeepney = {plateNumber: 'SDJISS', capacity: 12}

// createJeep(null, null, null, jeepney, client);