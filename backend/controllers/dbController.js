// TODO: Wrap this as a transaction.

// Parsing .csv files from /db
// Note: fs (file system) runs on root
const fs = require('fs')
const { parse } = require('csv-parse')

// Sync database with .csv
// A model is a table.
// TODO: Find a better way to read the number of columns in a csv file.
function csv_sync(model, filepath) {
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

// Keep database synced with .csv

module.exports = csv_sync;