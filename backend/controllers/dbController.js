// Synchronize .csv files with database on backend startup
// Approach recreates all db tables using .csv records, aside from users table

// TODO: Wrap this in a transaction.

// Parsing .csv files from /db
// Note: fs (file system) runs on root
const fs = require('fs')
const { parse } = require('csv-parse')

// Sync database with .csv
// A model is a table.
// TODO: Find a better way to read the number of columns in a csv file.
// ASSUMPTION: Gaps in IDs are okay!
// ASSUMPTION: driver id and tracker id are now HARDCODED. Client ensures that these are unique.
function csvsync(model, filepath) {
    fs.createReadStream(filepath)
    .pipe(parse({delimiter: ",", from_line: 1, trim: true, columns:true}))
    .on("data", (row) => {
        model.create(row)
    })
    .on("end", () => {
        console.log(`Finished reading ${filepath}`);
    })
    .on("error", (error) => {
        console.log(error.message);
    });
}

module.exports = csvsync;