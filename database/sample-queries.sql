SELECT j.id AS jeepneyID, j.platenumber, j.capacity, j.driverID, d.firstname, d.lastname
FROM jeepney AS j INNER JOIN driver AS d
ON (j.driverID = d.ID);

SELECT j.id AS jeepneyID, j.platenumber, t.coords
FROM jeepney AS j INNER JOIN tracker AS t
ON (j.trackerID = t.ID);