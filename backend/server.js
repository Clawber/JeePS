const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const { db, pool } = require('./models')

const userRoutes = require('./routes/userRoutes')
const jeepsRoutes = require('./routes/jeepsRoutes')

const Joi = require('joi')
const cors = require('cors')

// Setting up our port
const PORT = process.env.PORT || 8080

// Assigning the variable app to express
// IDEA: Only use one entry point, app, for our purposes
const app = express()
// app.use(cors())

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

db.sequelize.sync().then(() => {
    console.log('DB has been synced.')
})

// Assign handler modules to URIs
app.use('/api/users', userRoutes)
app.use('/api/jeeps', jeepsRoutes)

// Listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))