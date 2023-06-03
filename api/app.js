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
app.use(cors())

// Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// TODO: Non-destructive sync of .csv with db. Uses Migrations.
// Selective sync, then Synchronize .csv files with database
const csvSync = require('./controllers/dbController')
const [Driver, Jeepney, Route, Tracker] = [db.driver, db.jeepney, db.route, db.tracker];
// const filepaths = ['db/driver.csv', 'db/route.csv', 'db/tracker.csv', 'db/jeepney.csv']

Driver.sync({force:true}).then(() => {
    console.log('Driver has been synced.');
    csvSync(Driver, 'db/driver.csv')
}).then(() => {
    Route.sync({force:true}).then(() => {
        console.log('Route has been synced.');
        csvSync(Route, 'db/route.csv');
    }).then(() => {
        Jeepney.sync({force:true}).then(() => {
            console.log('Jeepney has been synced.');
            csvSync(Jeepney, 'db/jeepney.csv');
        })
    })
})

db.users.sync();

// Assign handler modules to URIs
app.use('/api/users', userRoutes)
app.use('/api/jeeps', jeepsRoutes)

// Listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))