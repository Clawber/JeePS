const Joi = require('joi');
const express = require("express");
const router = express.Router()

const { db, pool } = require('../models')



// https://jeeps-api.onrender.com/api/jeeps/1
// http://localhost:3000/api/jeeps/
router.get('/', getJeepsInfo)
router.get('/:id', getJeepInfoById)



module.exports = router;