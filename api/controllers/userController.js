//importing modules
const bcrypt = require("bcrypt");
const { db } = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config()

// Assigning users to the variable User
const User = db.User;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
 try {
   const { username, email, password } = req.body;
   const data = {
     username: username,
     email: email,
     password: await bcrypt.hash(password, 10),
   };
   //saving the user
   const user = await User.create(data);

   //if user details is captured
   //generate token with the user's id and the SECRET_KEY in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
       expiresIn: 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //send users details
     return res.status(201).send("Signup successful");
   } else {
     return res.status(409).send("Details are incorrect");
   }
 } catch (error) {
   console.log(error);
 }
};


// Login authentication, validate username

const login = async (req, res) => {
 try {
  const { username, password } = req.body;

    //find a user by their username
    const user = await User.findOne({
      where: {
      username: username
    } 
      
    });

    //if username is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
        //generate token with the user's id and the SECRET_KEY in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send("Login successful");
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
 signup,
 login
};