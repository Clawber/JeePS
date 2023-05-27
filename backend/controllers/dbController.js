const { db, pool } = require("../models");

const Driver = db.driver;
const Jeepney = db.jeepney;
const Route = db.route;
const Tracker = db.tracker;

// Parsing .csv files from /db
// Note: fs (file system) runs on root
const fs = require('fs')
const { parse } = require('csv-parse')

fs.createReadStream('./db/driver.csv')
    .pipe(parse({ delimiter: ",", from_line: 2}))
    .on("data", (row) => {
        console.log(row);
    })
    .on("end", () => {
        console.log("finished");
    })
    .on("error", (error) => {
        console.log(error.message);
    })

// Initialize database with .csv


// Keep database synced with .csv


module.exports = {};