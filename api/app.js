const express = require('express');
const cookieParser = require('cookie-parser');
const { db, pool } = require('./models');
const userRoutes = require('./routes/userRoutes');
const jeepsRoutes = require('./routes/jeepsRoutes');
const cors = require('cors');

const PORT = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const csvSync = require('./controllers/dbController')
const [Driver, Jeepney, Route] = [db.Driver, db.Jeepney, db.Route];
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

db.User.sync();

app.use('/api/users', userRoutes)
app.use('/api/jeeps', jeepsRoutes)

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))