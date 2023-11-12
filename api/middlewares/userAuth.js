//importing modules
const express = require("express");
const { db, pool } = require("../models");
const Joi = require('joi');

//Assigning db.users to User variable
const User = db.User;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    if (req.body.key !== process.env.ADMIN_KEY) {
      return res.status(409).send("Wrong admin key. Please contact JeePS support.")
    }

    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.status(409).send("Username already taken");
    }

    const emailschema = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'ph'] } });

    // checking if email is valid
    await emailschema.validate(req.body.email).catch((err) => {
      console.log(err)
      return res.status(409).send("Email is invalid. Please try again.")
    })

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).send("Email already taken");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  saveUser,
};