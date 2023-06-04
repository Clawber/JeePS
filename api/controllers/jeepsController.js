const Joi = require('joi');
const { db } = require('../models');
const [Jeepney, Driver, Route] = [db.Jeepney, db.Driver, db.Route];

// TODO: Add middleware for validating reqs (include Joi there)
class jeepsController {
    async createJeepney(req, res) {
        const schema = Joi.object({
            platenumber: Joi.string().alphanum().trim().min(6).max(8).required(),
            coords: Joi.array().items(Joi.number().required(), Joi.number().required()).length(2).required()
        })
        if (!req.body.platenumber) {
            return res.status(400).json({
                success: false,
                message: "Platenumber is required."
            })
        } else if (!req.body.capacity) {
            return res.status(400).json({
                success: false,
                message: "Capacity is required."
            })
        }

        let platenumber = req.body.platenumber;

        Jeepney.create(req.body)
        .then((jeepney) => {
            return res.status(201).json({
                success: true,
                message: `Jeepney with ID ${jeepney.id} successfully created.`,
                ret: jeepney
            })
        })
        .catch((err) => {
            // Only possible trigger is platenumber uniqueness constraint
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    success: false,
                    message: `Jeepney with platenumber ${platenumber} already exists.`,
                })
            } else {
                // I'm only expecting semantic errors (incompat types) to trigger this else block.
                return res.status(422).json({
                    success: false,
                    message: err.message,
                })
            }
        })
    }

    createDriver(req, res) {
        if (!req.body.firstname) {
            return res.status(400).json({
                success: false,
                message: "Driver's firstname is required."
            })
        } else if (!req.body.lastname) {
            return res.status(400).json({
                success: false,
                message: "Driver's lastname is required."
            })
        }

        Driver.create(req.body)
        .then((driver) => {
            return res.status(201).json({
                success: true,
                message: `Driver with ID ${driver.id} successfully created.`,
                ret: driver
            })
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                message: err.message
            })
        })
    }

    createRoute(req, res) {
        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                message: "Route name is required."
            })
        } else if (!req.body.color) {
            return res.status(400).json({
                success: false,
                message: "Route color is required."
            })
        }

        let name = req.body.name;

        Route.create(req.body)
        .then((route) => {
            return res.status(201).json({
                success: true,
                message: `Jeepney with ID ${route.id} successfully created.`,
                ret: route
            })
        })
        .catch((err) => {
            // Only possible trigger is routename uniqueness constraint
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    success: false,
                    message: `Route with name ${name} already exists.`,
                })
            } else {
                return res.status(422).json({
                    success: false,
                    message: err.message
                })
            }
        })
    }

    // Has options to join tables by foreign key
    async getAllJeepneys(req, res) {
        let jeepney;
        if (req.body.joinDriver && req.body.joinRoute) {
            jeepney = await Jeepney.findAll({
                include: [{model: Driver},
                    {model: Route, attributes: req.body.routeNoPath ? { exclude: ['path'] } : undefined}],
                order: [['id', 'ASC']]
            });
        } else if (req.body.joinDriver || req.body.joinRoute) {
            jeepney = await Jeepney.findAll({
                include: req.body.joinDriver ? Driver : Route,
                order: [['id', 'ASC']]
            });
        } else {
            jeepney = await Jeepney.findAll({
                order: [['id', 'ASC']]
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jeepneys successfully returned.",
            ret: jeepney
        })
    }

    async getAllDrivers(req, res) {
        const drivers = await Driver.findAll({
            order: [['id', 'ASC']]
        });
        return res.status(200).json({
            success: true,
            message: "Drivers successfully returned.",
            ret: drivers
        })
    }

    async getAllRoutes(req, res) {
        const route = await Route.findAll({
            order: [['id', 'ASC']]
        });
        return res.status(200).json({
            success: true,
            message: "Routes successfully returned.",
            ret: route
        })
    }

    async getJeepney(req, res) {
        const id = parseInt(req.params.id, 10);
        const jeepney = await Jeepney.findByPk(id).catch((err) => {
            return res.status(405).json({
                success: false,
                message: err.message
            })
        });
        if (jeepney === null) {
            return res.status(404).json({
                success: false,
                message: `Didn't find jeepney corresponding to ID ${id}`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Found matching jeepney.",
                ret: jeepney
            })
        }
    }

    async getDriver(req, res) {
        const id = parseInt(req.params.id, 10);
        const driver = await Driver.findByPk(id).catch((err) => {
            return res.status(405).json({
                success: false,
                message: err.message
            })
        });
        if (driver === null) {
            return res.status(404).json({
                success: false,
                message: `Didn't find driver corresponding to ID ${id}`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Found matching driver.",
                ret: driver
            })
        }
    }

    async getRoute(req, res) {
        const id = parseInt(req.params.id, 10);
        const route = await Route.findByPk(id).catch((err) => {
            return res.status(405).json({
                success: false,
                message: err.errors[0].message
            })
        });
        if (route === null) {
            return res.status(404).json({
                success: false,
                message: `Didn't find driver corresponding to ID ${id}`
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Found matching route.",
                ret: route
            })
        }
    }

    async updateJeepney(req, res) {
        if (!req.body.platenumber) {
            return res.status(400).json({
                success: false,
                message: "Platenumber is required."
            })
        } else if (!req.body.capacity) {
            return res.status(400).json({
                success: false,
                message: "Capacity is required."
            })
        }

        const id = parseInt(req.params.id, 10);

        Jeepney.update(req.body, {
            where: { id: id }
        })
        .then(async (check) => {
            if (check[0]) {
                return res.status(201).json({
                    success: true,
                    message: `Jeepney with ID ${id} successfully updated.`,
                    ret: await Jeepney.findByPk(id)
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Didn't find jeepney corresponding to ID ${id}`
                })
            }
        })
        .catch((err) => {
            // Only possible trigger is platenumber uniqueness constraint
            if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    success: false,
                    message: `Jeepney with platenumber ${platenumber} already exists.`,
                })
            } else {
                return res.status(422).json({
                    success: false,
                    message: err.message
                })
            }
        })
    }

    async updateDriver(req, res) {
        if (!req.body.firstname) {
            return res.status(400).json({
                success: false,
                message: "Driver's firstname is required."
            })
        } else if (!req.body.lastname) {
            return res.status(400).json({
                success: false,
                message: "Driver's lastname is required."
            })
        }

        const id = parseInt(req.params.id, 10);

        Driver.update(req.body, {
            where: { id: id }
        })
        .then(async (check) => {
            if (check[0]) {
                return res.status(201).json({
                    success: true,
                    message: `Driver with ID ${id} successfully updated.`,
                    ret: await Driver.findByPk(id)
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Didn't find driver corresponding to ID ${id}`
                })
            }
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                message: err.message
            })
        })
    }

    async updateRoute(req, res) {
        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                message: "Route name is required."
            })
        } else if (!req.body.color) {
            return res.status(400).json({
                success: false,
                message: "Route color is required."
            })
        }

        const id = parseInt(req.params.id, 10);

        Route.update(req.body, {
            where: { id: id }
        })
        .then(async (check) => {
            if (check[0]) {
                return res.status(201).json({
                    success: true,
                    message: `Route with ID ${id} successfully updated.`,
                    ret: await Route.findByPk(id)
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Didn't find route corresponding to ID ${id}`
                })
            }
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                message: err.message
            })
        })
    }

    async delJeepney(req, res) {
        const id = parseInt(req.params.id, 10);

        Jeepney.destroy({
            where: { id: id }
        })
        .then(async (check) => {
            if (check) {
                return res.status(201).json({
                    success: true,
                    message: `Jeepney with ID ${id} successfully deleted.`
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Didn't find Jeepney corresponding to ID ${id}`
                })
            }
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                message: err.message
            })
        })
    }

    async delDriver(req, res) {
        const id = parseInt(req.params.id, 10);

        Driver.destroy({
            where: { id: id }
        })
        .then(async (check) => {
            if (check) {
                return res.status(201).json({
                    success: true,
                    message: `Driver with ID ${id} successfully deleted.`
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Didn't find driver corresponding to ID ${id}`
                })
            }
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                message: err.message
            })
        })    }

    async delRoute(req, res) {
        const id = parseInt(req.params.id, 10);

        Route.destroy({
            where: { id: id }
        })
        .then(async (check) => {
            if (check) {
                return res.status(201).json({
                    success: true,
                    message: `Route with ID ${id} successfully deleted.`
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: `Didn't find route corresponding to ID ${id}`
                })
            }
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                message: err.message
            })
        })    }
}

module.exports = new jeepsController();