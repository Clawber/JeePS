-- Backticks are not supported by psql
-- Added driverID that references ID at driver table
CREATE TABLE jeepney (
	ID			SERIAL (6) NOT NULL PRIMARY KEY,
	tracker		SMALLINT NOT NULL REFERENCES tracker(ID),
	route		VARCHAR(3) NOT NULL REFERENCES route(name),
	plateNumber	VARCHAR(6) NOT NULL,
	capacity	SMALLINT NOT NULL,
	UNIQUE(tracker, route, plateNumber)
);

-- Removed battery from tracker.
-- POINT data type requires '' when being encoded.
CREATE TABLE tracker (
	ID			SMALLINT NOT NULL PRIMARY KEY,
	coords		POINT
);

-- Color is stored as INT, can be converted using HEX()
-- Path can be open () or closed []
CREATE TABLE route (
	name		VARCHAR(20) NOT NULL PRIMARY KEY,
	color		INT NOT NULL,
	path		PATH NOT NULL
);

CREATE TABLE driver (
	ID			SERIAL (6)  NOT NULL PRIMARY KEY
	driverFName	VARCHAR(20) NOT NULL,
	driverLName	VARCHAR(20) NOT NULL	
)