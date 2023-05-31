SELECT j.id AS jeepneyID, j.platenumber, j.capacity, j.driverID, d.firstname, d.lastname
FROM jeepney AS j INNER JOIN driver AS d
ON (j.driverID = d.ID);

SELECT j.id AS jeepneyID, j.platenumber, t.coords
FROM jeepney AS j INNER JOIN tracker AS t
ON (j.trackerID = t.ID);

SELECT j.id AS jeepneyID, j.platenumber, j.capacity, t.coords, d.firstname AS driverfirstname, d.lastname AS driverlastname, r.name AS routename, r.color AS routecolor, r.path AS routepath
FROM jeepney AS j
INNER JOIN tracker AS t
ON (j.trackerID = t.ID)
INNER JOIN driver AS d
ON (j.driverID = d.ID)
INNER JOIN route AS r
ON (j.routeID = r.ID)
ORDER BY (j.id);

-- Updated query
SELECT j.platenumber, j.capacity, j.coords, d.firstname AS driverfirstname, d.lastname AS driverlastname, r.name AS routename, r.color AS routecolor, r.path AS routepath
FROM jeepney AS j
INNER JOIN driver AS d
ON (j.driverID = d.ID)
INNER JOIN route AS r
ON (j.routename = r.name)
ORDER BY (j.platenumber);