// db model (all tables)
// Note: Sequelize automatically adds id column by default
// allowNull defaults to true
// defaultValue defaults to NULL
module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define("driver", {
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: "drivers",
        timestamps: false
    });

    const Jeepney = sequelize.define("jeepney", {
        trackerid: {
            type: DataTypes.INTEGER
        },
        routeid: {
            type: DataTypes.INTEGER
        },
        driverid: {
            type: DataTypes.INTEGER
        },
        platenumber: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        capacity: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: "jeepney",
        timestamps: false
    });

    // We can use html hex color representation next time
    // Changed schema to use ARRAY(POINTS) for compat with Sequelize
    const Route = sequelize.define("route", {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        color: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        path: {
            type: DataTypes.ARRAY(DataTypes.GEOMETRY('POINT'))
        }
    }, {
        freezeTableName: true,
        tableName: "route",
        timestamps: false
    })

    const Tracker = sequelize.define("tracker", {
        coords: {
            type: DataTypes.GEOMETRY('POINT')
        }
    }, {
        freezeTableName: true,
        tableName: "tracker",
        timestamps: false 
    })

    return [Driver, Jeepney, Route, Tracker]
 }