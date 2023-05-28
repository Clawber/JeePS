-- Removed battery from tracker.
-- POINT data type requires '' when being encoded.
CREATE TABLE tracker (
	ID			INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	coords		POINT
);

-- Color is stored as INT, can be converted using HEX()
-- Path can be open () or closed []
CREATE TABLE route (
	ID			INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name		VARCHAR(20) NOT NULL,
	color		INT NOT NULL,			-- Color is encoded as integer.
	path		PATH NOT NULL,
	UNIQUE(name, color)
);

CREATE TABLE driver (
	ID			INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	firstName	VARCHAR(20) NOT NULL,
	lastName	VARCHAR(20) NOT NULL
);

-- Backticks are not supported by psql.
-- Added driverID that references ID at driver table.
-- CREATE this last so references already exist.
CREATE TABLE jeepney (
	ID			INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	trackerID	INT REFERENCES tracker(ID) ON DELETE CASCADE,
	routeID		INT REFERENCES route(ID) ON DELETE CASCADE,
	driverID	INT REFERENCES driver(ID) ON DELETE CASCADE,
	plateNumber	VARCHAR(6) NOT NULL UNIQUE,
	capacity	SMALLINT NOT NULL
);

CREATE TABLE users (
	ID			INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username	VARCHAR(255) NOT NULL,
	email		VARCHAR(255) NOT NULL,
	password	VARCHAR(255) NOT NULL,
	createdAt	TIMESTAMP WITH TIME ZONE,
	updatedAt	TIMESTAMP WITH TIME ZONE
);

-- Restarting the Identity column:
ALTER TABLE table ALTER COLUMN id RESTART WITH 1;