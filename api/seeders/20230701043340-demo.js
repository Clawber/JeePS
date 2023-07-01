'use strict';

const fs = require("fs");
const {parse} = require("csv-parse");

async function csvRecords(filepath) {
  let records = [];
  return new Promise(resolve => {
    fs.createReadStream(filepath)
        .pipe(parse({delimiter: ",", from_line: 1, trim: true, columns:true}))
        .on("data", (row) => {
          row.createdAt = new Date().toISOString();
          row.updatedAt = new Date().toISOString();
          records.push(row);
        })
        .on("end", () => {
          console.log(`Finished reading ${filepath}`);
          resolve(records);
        })
        .on("error", (error) => {
          console.log(error.message);
        });
  })
}

async function csvIDs(filepath) {
  let records = [];
  return new Promise(resolve => {
    fs.createReadStream(filepath)
        .pipe(parse({delimiter: ",", from_line: 1, trim: true, columns:true}))
        .on("data", (row) => {
          let PK = Object.entries(row)[0]
          records.push(parseInt(PK[1]));
        })
        .on("end", () => {
          console.log(`Finished reading ${filepath}`);
          resolve(records);
        })
        .on("error", (error) => {
          console.log(error.message);
        });
  })
}

// csvRecords('db/driver.csv').then(records => console.log(records))
// csvRecords('db/route.csv');
// csvRecords('db/jeepney.csv');

// csvIDs('db/driver.csv').then(records => console.log(records))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('driver', await csvRecords('db/driver.csv'));
    await queryInterface.bulkInsert('route', await csvRecords('db/route.csv'));
    await queryInterface.bulkInsert('jeepney', await csvRecords('db/jeepney.csv'));
  },

  // This will only delete seed values, newly added values will be untouched
  // No need to restart identity since IDs of seed records are hardcoded by the .csv files
  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('driver',
        {id: {[Op.in]: await csvIDs('db/driver.csv')}}, {});
    await queryInterface.bulkDelete('route',
        {id: {[Op.in]: await csvIDs('db/route.csv')}}, {});
    await queryInterface.bulkDelete('jeepney',
        {id: {[Op.in]: await csvIDs('db/jeepney.csv')}}, {});
  }
};