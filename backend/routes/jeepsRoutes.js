const Joi = require('joi');
const express = require("express");
const router = express.Router()

const { db, pool } = require('../models');

const trackerDataSchema = Joi.object({
  platenumber: Joi.string().min(6).max(8).required(),
  coords: Joi.array().items(Joi.number().required(), Joi.number().required()).length(2).required()
})

const getJeeps = (request, response) => {
  if (request.body.platenumber === undefined) {
    console.log("GET all");
    pool.query("SELECT platenumber, coords FROM jeepney", (err, results) => {
      if (err) {
        throw err
      }
      response.status(200).json(results.rows)
    } )
  } else {
    console.log("GET by platenumber");
    const plateNumber = request.body.platenumber;
    
    pool.query(`SELECT coords FROM jeepney WHERE platenumber LIKE '${plateNumber}'`, (err, res) => {
      try {
        if (res.rows[0] === undefined) {
          response.status(400).send("Undefined read from table.")
        } else {
          const coords = res.rows[0].coords;

          message = {"platenumber": plateNumber, "coords": [coords.x, coords.y]}
          response.status(200).json(message)
        }
      } catch(err) {
        console.log(err.message)
      }
    })
  }
}

// https://jeeps-api.onrender.com/api/jeeps/1
// http://localhost:3000/api/jeeps/
router.get('/', getJeeps)

/*
Sample request:
POST website/api/jeeps/1
{"coords": [14.64827247,121.0737752]}
*/

router.post('/', (request, response) => {
  const { error } = trackerDataSchema.validate(request.body);
  if (error) {
    response.status(400).json({ error: error.details[0].message });
  } else {
    console.log("POST request: \n Contents: ");

    // Removed parseInt()
    const data = request.body;
    console.log(data);

    let plateNumber = data.platenumber;
    let x = data.coords[0];
    let y = data.coords[1];

    // Update jeep location on the database
    let query = `UPDATE jeepney SET coords = '(${x},${y})' WHERE platenumber LIKE '${plateNumber}'`;

    pool.query(query, (error, results) => {
      if (error) {
        // TODO: does error crash the server?
        throw error
      } 
      let message = "POST request processed successfully"
      response.status(200).json(message)
    })
  }
})


/*
Sample request:
POST website/api/jeeps/1
{
  "id": 1,
  "coords": [14.6575533,121.0742258]
}
*/
router.put('/', (req, res) => {
  const jeep = jeeps.find(c => c.id === req.body.platenumber)

  if (!jeep) {
    res.status(404).send('The jeep with the given platenumber was not found')
  }

  jeep.coords = req.body.coords;
  res.send(jeep);
})

module.exports = router;