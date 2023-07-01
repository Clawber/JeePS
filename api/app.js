const express = require('express');
const cookieParser = require('cookie-parser');
const { db } = require('./models');
const userRoutes = require('./routes/userRoutes');
const jeepsRoutes = require('./routes/jeepsRoutes');
const cors = require('cors');
const { Umzug } = require('umzug');

const PORT = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set to true if you wish to reset database using .csv seeds, User table is never reset
// WARNING: THIS CAN DESTROY THE DATABASE, do not use on PRODUCTION!
const RESET = false;

const csvSync = require('./controllers/dbController')
const [Driver, Jeepney, Route] = [db.Driver, db.Jeepney, db.Route];
// const filepaths = ['db/driver.csv', 'db/route.csv', 'db/tracker.csv', 'db/jeepney.csv']

Driver.sync({force: RESET}).then(() => {
    console.log('Driver has been synced.');
    RESET ? csvSync(Driver, 'db/driver.csv') : null;
}).then(() => {
    Route.sync({force: RESET}).then(() => {
        console.log('Route has been synced.');
        RESET ? csvSync(Route, 'db/route.csv') : null;
    }).then(() => {
        Jeepney.sync({force: RESET}).then(() => {
            console.log('Jeepney has been synced.');
            RESET ? csvSync(Jeepney, 'db/jeepney.csv') : null;
        }).then(() => {
            app.get('/', (req, res) => {
                res.status(200).send("This is the JeePS endpoint.")})
            app.use('/api/users', userRoutes)
            app.use('/api/jeeps', jeepsRoutes)

            app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
        })
    })
})

db.User.sync();

// db.sequelize.sync();

// const umzug = new Umzug({
//     migrations: { glob: 'api/migrations/*.js' },
//     context: db.sequelize.getQueryInterface(),
//     logger: console,
// });
//
// umzug.pending().then(function(migrations) {
//     // "migrations" will be an Array with the names of
//     // pending migrations.
//     console.log(migrations)
//     umzug.up().then(function(migrations) {
//         console.log(migrations);
//
//         app.get('/', (req, res) => {
//             res.status(200).send("This is the JeePS endpoint.")})
//         app.get('/api', (req, res) => {
//             res.status(200).send("This is the JeePS endpoint.")})
//         app.use('/api/users', userRoutes)
//         app.use('/api/jeeps', jeepsRoutes)
//
//         app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
//     });
// });