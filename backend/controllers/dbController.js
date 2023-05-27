const { db, pool } = require("../models");

const Driver = db.driver;
const Jeepney = db.jeepney;
const Route = db.route;
const Tracker = db.tracker;

// TODO: Wrap this as a transaction.

// Parsing .csv files from /db
// Note: fs (file system) runs on root
const fs = require('fs')
const { parse } = require('csv-parse')

// Initialize database with .csv
// A model is a table.
// TODO: Find a better way to read the number of columns in a csv file.
function init(model, filepath) {
    fs.createReadStream(filepath)
    .pipe(parse({delimiter: ",", from_line: 1, trim: true, columns:true}))
    .on("data", async (row) => {
        let columns = Object.keys(row);
        await model.create(row, {fields: columns})
    })
    .on("end", () => {
        console.log(`Finished reading ${filepath}`);
    })
    .on("error", (error) => {
        console.log(error.message);
    });
}
init(Driver, 'db/driver.csv')

// Keep database synced with .csv


module.exports = {};