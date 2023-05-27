const Joi = require('joi');
const express = require("express");
const router = express.Router()

const { db, pool } = require('../models');

// Synchronize .csv files with database
const dbController = require('../controllers/dbController')

const coords_schema = Joi.object({
  coords: Joi.array().items(Joi.number().required(), Joi.number().required()).length(2).required()
})

const getJeeps = (request, response) => {
  console.log("GET all");
  pool.query("SELECT * FROM tracker", (error, results) => {
    if (error) {
      throw error
    } 
    response.status(200).json(results.rows)
  } )
}

const getJeepById = (request, response) => {
  console.log("GET by ID");
  const id = parseInt(request.params.id)

  pool.query(`SELECT coords FROM tracker WHERE id = ${id} ORDER BY id`, (error, results) => {
    if (error) {
      throw error
    } 

    coords = results.rows[0].coords
    message = {"id": id,
          "coords": [coords.x, coords.y]
        }

    response.status(200).json(message)
  } )
}

// https://jeeps-api.onrender.com/api/jeeps/1
// http://localhost:3000/api/jeeps/
router.get('/', getJeeps)
router.get('/:id', getJeepById)

/*
Sample request:
POST website/api/jeeps/1
{"coords": [14.64827247,121.0737752]}
*/

router.post('/:id', (request, response) => {
  const { error } = coords_schema.validate(request.body)
  if (error) {
    response.status(400).json({ error: error.details[0].message});
  } else {
    console.log("POST request: \n Contents: ");

    const id = parseInt(request.params.id)
    const data = request.body;

    console.log(data);

    let x = data.coords[0]
    let y = data.coords[1]

    // Update jeep location on the database
    let query = `UPDATE tracker SET coords = '(${x},${y})' WHERE id = ${id}`;

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
router.put('/:id', (req, res) => {
  const jeep = jeeps.find(c => c.id === parseInt(req.params.id))

  if (!jeep) {
    res.status(404).send('The jeep with the given ID was not found')
  }

  jeep.coords = req.body.coords;
  res.send(jeep);
})

module.exports = router;