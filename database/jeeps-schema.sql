-- Backticks are not supported by psql.
-- Added driverID that references ID at driver table.
CREATE TABLE jeepney (
	ID			SERIAL NOT NULL PRIMARY KEY,
	trackerID	SERIAL NOT NULL REFERENCES tracker(ID),
	routeID		SERIAL NOT NULL REFERENCES route(ID),
	driverID	SERIAL NOT NULL REFERENCES driver(ID),
	plateNumber	VARCHAR(6) NOT NULL,
	capacity	SMALLINT NOT NULL,
	UNIQUE(trackerID, routeID, driverID, plateNumber)
);

-- Removed battery from tracker.
-- POINT data type requires '' when being encoded.
CREATE TABLE tracker (
	ID			SERIAL NOT NULL PRIMARY KEY,
	coords		POINT
);

-- Color is stored as INT, can be converted using HEX()
-- Path can be open () or closed []
CREATE TABLE route (
	ID			SERIAL NOT NULL PRIMARY KEY,
	name		VARCHAR(20) NOT NULL,
	color		INT NOT NULL,			-- Color is encoded as integer.
	path		PATH NOT NULL,
	UNIQUE(name)
);

CREATE TABLE driver (
	ID			SERIAL NOT NULL PRIMARY KEY,
	driverFName	VARCHAR(20) NOT NULL,
	driverLName	VARCHAR(20) NOT NULL
)