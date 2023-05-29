// Route:   /api/jeeps/info
const Joi = require('joi');
const express = require("express");
const router = express.Router()

const { db, pool } = require('../models')

const getJeepsInfo = (req, res) => {
  // TODO: GET all JeepsInfo
  res.status(200).json("hello world")
}

const getJeepInfoById = (req, res) => {
  // TODO:
}


// http://localhost:8080/api/jeeps/
router.get('/', getJeepsInfo)
router.get('/:id', getJeepInfoById)



module.exports = router;