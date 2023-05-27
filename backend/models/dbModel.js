// db model (all tables)
// Note: Sequelize automatically adds id column by default, but we modify it to be a generated column
// allowNull defaults to true
// defaultValue defaults to NULL
// In the future, we can add trigger functions to further automate updating of frontend.
// DataTypes.ARRAY() and DataTypes.GEOMETR('PATH') may be used in the future.
module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define("driver", {
        firstname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: "driver",
        timestamps: false
    });

    const Jeepney = sequelize.define("jeepney", {
        platenumber: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: true
        },
        capacity: {
            type: DataTypes.SMALLINT,
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
            type: 'PATH',
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: "route",
        timestamps: false
    });

    const Tracker = sequelize.define("tracker", {
        coords: {
            type: 'POINT',
            allowNull: false
        }
    }, {
        freezeTableName: true,
        tableName: "tracker",
        timestamps: false
    });

    // Driver 1 : many Jeepney
    Driver.hasMany(Jeepney, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });
    Jeepney.belongsTo(Driver);

    // Route 1 : many Jeepney
    Route.hasMany(Jeepney, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });
    Jeepney.belongsTo(Route);

    // Tracker 1 : 1 Jeepney
    Tracker.hasOne(Jeepney, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });
    Jeepney.belongsTo(Tracker);

    return [Driver, Jeepney, Route, Tracker];
}