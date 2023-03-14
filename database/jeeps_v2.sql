INSERT INTO route (name, color, path) VALUES ('Ikot', 10, '( ( 10 , 20 ) , ( 30 , 40 ) )');

SELECT * FROM route;

INSERT INTO tracker (id, coords, battstatus) VALUES (1, '(10, 20)', 95.50);

INSERT INTO jeepney (id, tracker, route, platenumber, driverfname, driverlname, capacity)
VALUES ('IKT001', 1, 'Ikot', 'PLT001', 'Jose', 'Manalo', 18);

ALTER TABLE jeepney
ALTER COLUMN route TYPE VARCHAR(20);

SELECT * FROM jeepney;
SELECT * FROM route;

SELECT * FROM tracker;