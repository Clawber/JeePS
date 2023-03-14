-- Backticks are not supported by psql
CREATE TABLE jeepney (
	ID			VARCHAR(6) NOT NULL PRIMARY KEY,
	tracker		SMALLINT NOT NULL REFERENCES tracker(ID),
	route		VARCHAR(3) NOT NULL REFERENCES route(name),
	plateNumber	VARCHAR(6) NOT NULL,
	driverFName	VARCHAR(20) NOT NULL,
	driverLName	VARCHAR(20) NOT NULL,
	capacity	SMALLINT NOT NULL,
	UNIQUE(tracker, route, plateNumber)
);

CREATE TABLE tracker (
	ID			SMALLINT NOT NULL PRIMARY KEY,
	coords		POINT,
	battStatus	NUMERIC(5, 2) NOT NULL
);

-- Color is stored as INT, can be converted using HEX()
-- Path can be open () or closed []
CREATE TABLE route (
	name		VARCHAR(20) NOT NULL PRIMARY KEY,
	color		INT NOT NULL,
	path		PATH NOT NULL
);