CREATE TABLE "Employees"
(
    id SERIAL,
    name text,
    title text,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

INSERT INTO Employees(name, title) VALUES
 ('Meadow Crystalfreak ', 'Head of Operations'),
 ('Buddy-Ray Perceptor', 'DevRel'),
 ('Prince Flitterbell', 'Marketing Guru');