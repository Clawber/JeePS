const router = require("express").Router();
const JC = require('../controllers/jeepsController.js');
require('dotenv').config()

router.post('/jeepney', JC.createJeepney);
router.post('/driver', JC.createDriver);
router.post('/route', JC.createRoute);

router.get('/jeepney', JC.getAllJeepneys);
router.get('/driver', JC.getAllDrivers);
router.get('/route', JC.getAllRoutes);

router.get('/jeepney/:id', JC.getJeepney);
router.get('/driver/:id', JC.getDriver);
router.get('/route/:id', JC.getRoute);

router.put('/jeepney/:id', JC.updateJeepney);
router.put('/driver/:id', JC.updateDriver);
router.put('/route/:id', JC.updateRoute);

router.delete('/jeepney/:id', JC.delJeepney);
router.delete('/driver/:id', JC.delDriver);
router.delete('/route/:id', JC.delRoute);

module.exports = router;