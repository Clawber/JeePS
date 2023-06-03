// Synchronize .csv files with database on backend startup
// Approach relies on enforcing of UNIQUE constraints

// TODO: Wrap this in a transaction.

// Parsing .csv files from /db
// Note: fs (file system) runs on root
const fs = require('fs')
const { parse } = require('csv-parse')

// Sync database with .csv
// A model is a table.
// ASSUMPTION: driver id and tracker id are now HARDCODED. Client ensures that these are unique.
function csvSync(model, filepath) {
    fs.createReadStream(filepath)
    .pipe(parse({delimiter: ",", from_line: 1, trim: true, columns:true}))
    .on("data", (row) => {
        let PK = Object.entries(row)[0]
        model.create(row).catch((err) => console.log(model.name, PK, err.name))
    })
    .on("end", () => {
        console.log(`Finished reading ${filepath}`);
    })
    .on("error", (error) => {
        console.log(error.message);
    });
}

module.exports = csvSync;